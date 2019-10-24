
let planetDiv = document.getElementById("planet");
// let btnTravel = document.getElementById("travel");
let spaceShipsDiv = document.getElementById("spaceShips");
let myShipDiv = document.getElementById("myShip");

let formulaService = {

    fuelCalculation(planet) {
        return fuel = planet.distance * 20;
    },
    timeToTravel(planet, ship) {
        return planet.distance * 1000 / ship.speed
    },
    show() {
        let planetService = document.getElementById("service");
        planetService.addEventListener("click", function (e) {
            e.preventDefault();
            let value = e.target.getAttribute("value");
            switch (value) {
                case "addFuel":
                    planetToTravel.refuel(choosenShip);
                    break;
                case "repair":
                    planetToTravel.repair(choosenShip);
                    break;
                case "hireCrew":
                    planetToTravel.hireCrewMemeber(choosenShip);
                    break;
            }
        })
    }
};
////Divs Style Display
planetDiv.style.display = "none";

let price = {
    fuel: 50,
    repair: 60,
    crew: 80
}

let dockedShips = [];

class SpaceShip {
    constructor(name, crew, fuel, hull, speed, img) {
        this.name = name,
            this.crew = crew,
            this.fuel = fuel,
            this.hull = hull,
            this.credit = 500,
            this.speed = speed,
            this.img = img,
            this.isWorking = false,
            this.isDamaged = false,
            this.isDestroy = false,
            this.dockedPlanet = null,
            this.maxFuel = fuel,
            this.maxHull = hull;
    }
    start(planet) {
        if (planet instanceof Planets === false) {
            return console.log(`We don't have planet with name ${planet.name}`)
        }
        if (this.isWorking === true) {
            return console.log(`${this.name} is already traveling to another planet`)
        }
        let neededFuel = formulaService.fuelCalculation(planet);
        console.log(neededFuel)
        if (this.dockedPlanet === planet.name) {
            return console.log(`You are already docket on the ${planet.name}`)
        }
        if (this.fuel < neededFuel) {
            return console.log(`${this.name} don't have fuel to reach the ${planet.name}`)
        }
        if (this.isDamaged === true || this.isDestroy === true || this.crew <= 0) {
            return console.log(`Your ship is damaged`)
        } else {
            this.isWorking = true;
            let that = this
            console.log(`${this.name} is traveling to ${planet.name}`)
            setTimeout(() => {
                that.fuel = that.fuel - neededFuel;
                that.dock(planet);
            }, formulaService.timeToTravel(planet, this));
        }
    }
    dock(planet) {
        setTimeout(() => {
            console.log(`${this.name} is docked on ${planet.name}`)
            // this.fuel = this.neededFuel
            let that = this
            dockedShips.push(that);
            that.isWorking = false;
            that.dockedPlanet = planet.name;
            let addButton = document.getElementById("shipToTravel");
            addButton.innerHTML +=
                `<div id="service"><button id= "addFuel" value="addFuel">Refuel</button>
            <button id= "repair" value ="repair">Repair</button>
            <button id= "hireCrew" value="hireCrew">HireCrew</button></div>`
            formulaService.show()
            serviceDisplay.displayPlanets(planet);
            console.log(that);

        }, 2000)
    }
}
class Planets {
    constructor(name, size, population, distance, development, dockedShips, img) {
        this.name = name,
            this.size = size,
            this.population = population,
            this.distance = distance,
            this.development = development,
            this.shipDocked = dockedShips,
            this.img = img;
    }
    getMarketPrice(price) {
        return this.development * price - Math.floor(this.population / this.size)
    }
    repair(ship) {
        if (ship instanceof SpaceShip === false) {
            return console.log(`This is not a Ship`)
        }
        if (ship.dockedPlanet === null) {
            return console.log(`the ${ship} is not docket on ${this.name}`)
        }
        if (ship.hull === ship.maxHull) {
            return console.log(`the ${ship.name} have max hull`)
        }
        let needToRepair = this.getMarketPrice(price.repair);
        if (needToRepair < ship.credit) {
            return console.log(`You don't have enough credit to repair the ship`)
        } else {
            console.log(`Your Ship is repair go luck`)
            ship.hull = ship.maxHull
            ship.credit = ship.credit - needToRepair
        }
    }
    refuel(ship) {
        if (ship instanceof SpaceShip === false) {
            return console.log(`This is not a Ship`)
        }
        if (!ship.dockedPlanet === this) {
            return console.log(`the ${ship.name} is not docket on ${this.name}`)
        }
        if (ship.fuel === ship.maxFuel) {
            return console.log(`the ${ship.name} have max fuel`)
        }
        let needToRefuel = this.getMarketPrice(price.fuel);
        if (needToRefuel > ship.credit) {
            return console.log(`You don't have enough credit to refuel the ship`)
        } else {
            console.log(`Your Ship have full tank go luck`);
            ship.fuel = ship.maxFuel;
            ship.credit = ship.credit - needToRefuel;
            console.log(this.fuel);
        }
    }
    hireCrewMemeber(ship) {
        if (ship instanceof SpaceShip === false) {
            return console.log(`This is not a Ship`)
        }
        if (ship.dockedPlanet === null) {
            return console.log(`the ${ship.name} is not docket on ${this.name}`)
        }
        let hireCrew = this.getMarketPrice(price.crew);
        if (hireCrew > ship.credit) {
            return console.log(`You don't have enough credit to Hire crews the ship`)
        } else {
            ship.crew += 1
            console.log(ship.crew);
            ship.credit = ship.credit - hireCrew;
        }
    }
}

class TravelEvents {
    constructor(name, decription, ) {
        this.name = name,
            this.decription = decription,
            this.crewModifier = function () {
                let min = -1;
                let max = 2;
                return Math.floor(Math.random() * (max - min)) + min;
            },
            this.fuelModifier = Math.floor(Math.random() * 200) - 100,
            this.hullmodifire = Math.floor(Math.random() * 200) - 100
    }
    startEvent(ship){
        if(ship instanceof SpaceShip === false ){
          return console.log(`This is not a ship`)
        }
    }
}


let ship1 = [new SpaceShip('Star Destroyer', 4, 500, 600, 0.5, "https://i.stack.imgur.com/vQ9Yn.png"),
    new SpaceShip('Naboo N1 Starfighter', 4, 500, 600, 0.2, "https://www.freepngimg.com/thumb/star_wars/5-2-star-wars-ship-vector-png-thumb.png"),
    new SpaceShip('X-34 Landspeeder', 4, 500, 600, 0.7, "https://www.toy-palace.com/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/r/a/radio-flyer-x-34-landspeeder-kinderfahrzeug-star-wars_-episode-iv-159-cm-lang_RF934AU_3_1.png")
];




let planet = [new Planets("Alfheim", 500000, 300000, 2, 2, dockedShips, "https://i.pinimg.com/originals/1a/30/ac/1a30ac97225e532c186f39483685e536.jpg"),
    new Planets("Asgard", 9899587, 3013012, 2, 7, dockedShips, "https://i.redd.it/3nhlopqwgyb01.jpg", ),
    new Planets("Midgard", 9978687, 3013012, 12, 2, dockedShips, "https://i.kinja-img.com/gawker-media/image/upload/s--6BwRkO8X--/c_scale,f_auto,fl_progressive,q_80,w_800/763492984179205290.jpg"),
]

// let events = [
//     new SpaceEvent("Fuel Leak", "Due to low maintenance of the ship, the fuel tank leaked. The leak was patched, but we lost some fuel."),
//     new SpaceEvent("Pirates!", "Space pirates attacked the ship! We escaped, but our hull took some damage!"),
//     new SpaceEvent("Unknown substance", "An unknown substance was found on the cargo ship. A crew member touched it and died on the spot."),
//     new SpaceEvent("Asteroid field", "We entered an asteroid field. It was hard, but our captain managed to go out of it."),
//     new SpaceEvent("Fire on deck", "The main system overheated and fire broke from one of the panels. The crew quickly extinguished it."),
//     new SpaceEvent("Bad stop", "You stop at a nearby station for a pit-stop. They give you repair supplies."),
//     new SpaceEvent("Captains Birthday", "It's the captain's birthday. Everybody got drunk. Nobody remembers what happened the last 12 hours."),
//     new SpaceEvent("Space Shark", "Your ship is attacked by a space shark. After killing it, you watch a tutorial on how to turn shark blood in to fuel."),
//     new SpaceEvent("Alien in need", "An alien is stranded on it's broken ship. It took some time and effort but you save him and board him on your ship."),
//     new SpaceEvent("Hail the federation", "A federation cruiser hails you. They help you with supplies and fuel."),
//     new SpaceEvent("Destroyed Transport Ship", "You encounter a destroyed transport ship. It's dangerous, but you try salvaging its fuel tank."),
//     new SpaceEvent("Angry Spider", "An angry spider appears on the deck. The captain stomps on it. Everything is fine")
// ]

/////// TEST TEST TEST
// ship1[0].start(planet[0]);
// // setTimeout(() => {
// //     planet[0].refuel(ship1[0]);
// // }, 3000);


// setTimeout(() => {
//     console.log(ship1[0])
//     console.log(planet[0]);
//     planet[0].hireCrewMemeber(ship1[0]);
//     planet[0].refuel(ship1[0]);
//     ship1[0].start(planet[1]);
// }, 10000);



let serviceDisplay = {
    displayPlanets(planetArr) {
        for (i = 0; i < planetArr.length; i++) {
            planetDiv.innerHTML += `<div class="card" style="width: 18rem;" id = "cardDisplayPlanet" value="${planetArr[i].name}">
            <img src="${planetArr[i].img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h2 class="card-title">Planet Name <br>${planetArr[i].name}</h2>
            </div>
            <div class="list-group list-group-flush">
              <h3 class="list-group-item">Planet Size:${planetArr[i].size}</h3>
              <h3 class="list-group-item">Planet Distance:${planetArr[i].distance}</h3>
              <h3 class="list-group-item">Planet Population:${planetArr[i].population}</h3>
            </div>
            <div class="card-body">
            <button type="button" id="travel" value="${i}">Travel to ${planetArr[i].name}</button>
            </div>`
        }
    },
    displaySpaceShips(spaceShip) {
        for (i = 0; i < spaceShip.length; i++) {
            spaceShipsDiv.innerHTML +=
                `<div class="card" style="width: 18rem;" id ="cardDisplayShips" >
            <img src="${spaceShip[i].img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h2 class="card-title">Ship Name <br>${spaceShip[i].name}</h2>
            </div>
            <div class="list-group list-group-flush">
              <h3 class="list-group-item">Ship Crew: ${spaceShip[i].crew}</h3>
              <h3 class="list-group-item">Ship Max Speed: ${spaceShip[i].speed}</h3>
              <h3 class="list-group-item">Ship Max fuel capasity: ${spaceShip[i].fuel}</h3>
              <h3 class="list-group-item">Ship Max Hull: ${spaceShip[i].hull}</h3>
            </div>
            <div class="card-body">
                <button type="button" id="ships" value="${i}"> Travel With ${spaceShip[i].name}</button>
            </div>
                </div>`
        }
    },
    // Display Ship you Choose
    yourShip(ships, indexValue) {
        spaceShipsDiv.innerHTML = "";
        spaceShipsDiv.innerHTML = `<div class="card" style="width: 18rem;" id = "shipToTravel">
            <img src="${ships[indexValue].img}" class="card-img-top" alt="...">
            <div class="card-body">
              <h2 class="card-title">Ship Name <br>${ships[indexValue].name}</h2>
            </div>
            <div class="list-group list-group-flush">
              <h3 class="list-group-item">Ship Crew:${ships[indexValue].crew}</h3>
              <h3 class="list-group-item">Ship Max fuel capasity:${ships[indexValue].fuel}</h3>
              <h3 class="list-group-item">Ship Max Hull:${ships[indexValue].hull}</h3>
            </div>
            </div>`;
        document.body.append(myShipDiv);
        return choosenShip = ships[indexValue];
    },
    destinationPlanet(planets, index) {
        planetDiv.innerHTML = "";
        planetDiv.innerHTML = `<div class="card" style="width: 18rem;" id = "yourDestination" value="${planets[index].name}">
        <img src="${planets[index].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h2 class="card-title">Planet Name <br>${planets[index].name}</h2>
        </div>
        <div class="list-group list-group-flush">
          <h3 class="list-group-item">Planet Size:${planets[index].size}</h3>
          <h3 class="list-group-item">Planet Distance:${planets[index].distance}</h3>
          <h3 class="list-group-item">Planet Population:${planets[index].population}</h3>
        </div>
        <div class="card-body">
        <button type="button" id="destionationPleace" value="test">Travel to ${planets[index].name}</button>
        </div>`
    }

}
serviceDisplay.displaySpaceShips(ship1);
serviceDisplay.displayPlanets(planet);
let btnSpaceShip = document.getElementById("spaceShips");

let choosenShip;
btnSpaceShip.addEventListener("click", function (e) {
    e.preventDefault()
    let value = e.target.getAttribute("value")
    switch (value) {
        case "0":
            serviceDisplay.yourShip(ship1, 0);
            planetDiv.style.display = "block";
            choosenShip = ship1[0]
            break;
        case "1":
            serviceDisplay.yourShip(ship1, 1);
            planetDiv.style.display = "block";
            choosenShip = ship1[1]
            break;
        case "2":
            serviceDisplay.yourShip(ship1, 2);
            planetDiv.style.display = "block";
            choosenShip = ship1[2]
            break;
        case "3":
            serviceDisplay.yourShip(ship1, 3);
            planetDiv.style.display = "block";
            choosenShip = ship1[3]
            break;
        case "4":
            choosenShip = serviceDisplay.yourShip(ship1, 4);
            planetDiv.style.display = "block";
            choosenShip = ship1[4]
            break;
        case "5":
            choosenShip = serviceDisplay.yourShip(ship1, 5);
            planetDiv.style.display = "block";
            choosenShip = ship1[5]
    }
    console.log(choosenShip);
})


let btnTravelTo = document.getElementById("planet");

let planetToTravel;

btnTravelTo.addEventListener("click", function (e) {
    e.preventDefault()
    let value = e.target.getAttribute("value")
    switch (value) {
        case "0":
            // planetToTravel = serviceDisplay.destinationPlanet(planet, 0);
            planetToTravel = planet[0]
            choosenShip.start(planetToTravel);
            break;
        case "1":
            // serviceDisplay.destinationPlanet(planet, 1);
            planetToTravel = planet[1]
            choosenShip.start(planetToTravel);
            break;
        case "2":
            planetToTravel = serviceDisplay.destinationPlanet(planet, 2);
            planetToTravel = planet[2]
            choosenShip.start(planetToTravel);
            break;
        case "3":
            planetToTravel = serviceDisplay.displayPlanets(planet, 3);
            planetToTravel = planet[3]
            choosenShip.start(planetToTravel);
            break;
        case "4":
            planetToTravel = serviceDisplay.displayPlanets(planet, 4);
            planetToTravel = planet[4]
            choosenShip.start(planetToTravel);
            break;
    }
})