

//---------------All Calculation Below This line

let formulaService = {
    fuelCalculation(planet) {
        return fuel = planet.distance * 20;
    },
    timeToTravel(planet, ship) {
        return planet.distance * 1000 / ship.speed
    },
    platinumCount() {
        let condition = Math.abs(Math.floor(Math.random() * 20 - 10))
        if (condition > 5 && condition < 10) {
            return 2;
        }
        else {
            return 0;
        }
    },
    dimontCount() {
        let condition = Math.abs(Math.floor(Math.random() * 20 - 10))
        if (condition > 5 && condition < 10) {
            return 1
        }
        else {
            return 0;
        }
    },
    workingTime() {
        let earnedGoods = {
            gold: Math.abs(Math.floor(Math.random() * 20 - 10)),
            silver: Math.abs(Math.floor(Math.random() * 20 - 10)),
            bronze: Math.abs(Math.floor(Math.random() * 20 - 10)),
            platinum: formulaService.platinumCount(),
            dimond: formulaService.dimontCount(),
        }
        return earnedGoods;
    },
    crewModifier(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    generateEvents(time, events) {
        let eventsNumber = [];
        let getRandom = function (min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        }
        let eventStart = 1
        if (time > 26000) {
            eventStart = 4;
        }
        if (time > 20000) {
            eventStart = 3;
        }
        if (time > 15000) {
            eventStart = 2;
        }
        for (i = 0; i < eventStart; i++) {
            eventsNumber.push(events[getRandom(0, events.length - 1)])
        }
        return eventsNumber;
    }
}
class Planes {
    constructor(name, speed, hull, fuel, crewCapasity, img, price) {
        this.PlaneName = name,
            this.speed = speed,
            this.hull = hull,
            this.fuel = fuel,
            this.crewCapasity = crewCapasity,
            this.img = img,
            this.price = price,
            this.maxHull = hull,
            this.maxFuel = fuel,
            this.isWorking = false,
            this.isDistroy = false,
            this.isDamaged = false,
            this.docketPalent = null,
            this.workingOnPlanet = false
    }

}
let shipDocked = []
class Planets {
    constructor(name, distance, size, population, development, shipDocked, img) {
        this.PlanetName = name,
            this.distance = distance,
            this.size = size,
            this.population = population,
            this.development = development,
            this.docketShip = shipDocked,
            this.img = img
    }

    getMarketPrice(price) {
        return this.development * price - Math.floor(this.population / this.size)
    }
    reparShip(captain) {
        if (!captain instanceof Captain) {
            return console.log(`${ship} is not a space ship`);
        }
        if (ship.docketPalent === null) {
            return console.log(`${captain.PlaneName} is not docked on ${this.name}`);
        }
        if (captain.hull === captain.maxHull) {
            return console.log(`Don't need to repair your ship you have max hull`);
        }
        let neededMoney = this.getMarketPrice(mentainece.repair);
        if (neededMoney > captain.credit) {
            return console.log(`${captain.name} don't have enough money to repari the ship`)
        }
        else {
            captain.credit = neededFuel - captain.credit;
            captain.fuel = captain.maxFuel;
        }

    }
    Refuel(captain) {
        if (!captain instanceof Captain) {
            return console.log(`${captain} is not a space ship`);
        }
        if (!captain.OnPlanet === this.PlanetName) {
            return console.log(`${captain.PlaneName} is not docked on ${this.PlanetName}`);
        }
        if (captain.fuel === captain.maxFuel) {
            return console.log(`Hey ${captain.CaptainName} you have full tank of fuel`);
        }
        let neededMoney = this.getMarketPrice(mentainece.fuel);
        if (neededMoney > captain.credit) {
            return console.log(`Capten ${captain.CaptainName} you don't have enough money`);
        }
        else {
            captain.credit = neededMoney - captain.credit;
            captain.fuel = captain.maxFuel;
        }
    }
    hireCrewMembers(captain) {
        if (!captain instanceof Captain) {
            return console.log(`${ship} is not a space ship`);
        }
        if (!captain.OnPlanet === this.PlanetName) {
            return console.log(`${captain.PlaneName} is not docked on ${this.PlanetName}`);
        }
        let neededMoney = this.getMarketPrice(mentainece.crew);
        if (neededMoney > captain.credit) {
            return console.log(`Captain ${captain.CaptainName} you can't hire anyone.\n
            you need more money`)
        }
        if (captain.crew === captain.crewCapasity) {
            return console.log(`We don't have enough space on ship to hire more crew members`)
        }
        else {
            captain.credit = neededMoney - captain.credit;
            captain.CrewMembers += 1;
        }
    }
    StartWorking(captain) {
        if (!captain instanceof Captain) {
            return console.log(`We have some problem please check the inputs`);
        }
        if (!captain.OnPlanet === this.PlaneName) {
            return console.log(`You are not docked on this planet`);
        }
        else {
            console.log(`Your crew will start with work good luck`)
            setTimeout(() => {
                let FoundGoods = formulaService.workingTime();
                Object.assign(captain.goodsYouhave, FoundGoods)
                console.log(captain.goodsYouhave.gold)
                console.log(captain)
            }, 1000);
        }
    }
}

class Captain {
    constructor(name, sumName, age, bannerFlag, homePlanet) {
        this.CaptainName = name;
        this.sumName = sumName;
        this.age = age;
        this.bannerFlag = bannerFlag;
        this.credit = 200;
        this.ownedShip = null;
        this.numbFlights = null;
        this.homePlanet = homePlanet;
        this.visitedPlanet = [];
        this.CrewMembers = 0;
        this.OnPlanet = homePlanet;
        this.goodsYouhave = [];
    }
    buyShip(ship) {
        if (!ship instanceof Planes) {
            return console.log(`This is not a ship`);
        }
        let neededMoney = this.credit - ship.price;
        if (neededMoney < 0) {
            return console.log(`${this.name} you don't have enough money to buy this ship`);
        }
        if (!this.ownedShip === null) {
            return console.log(`captain you already own your ship`);
        }
        else {
            this.ownedShip = ship.PlaneName;
            return console.log(Object.assign(this, ship));
        }
    }
    async beginToTravel(planet) {
        if (!planet instanceof Planes) {
            return console.log(`${planet} is not a Planet`);
        }
        if (this.ownedShip === null) {
            return console.log(`${this.PlaneName} don't have a captain`);
        }
        if (this.isWorking === true) {
            return console.log(`${this.PlaneName} is traveling right now`);
        }
        if (this.workingOnPlanet === true) {
            return console.log(`${this.PlaneName} can't travel now captains crew is working on ${planet.name}`)
        }
        if (planet.name === this.docketPalent) {
            return console.log(`You are already docket on this planet`);
        }
        let neededFuel = formulaService.fuelCalculation(planet);
        console.log(neededFuel)
        if (neededFuel > this.fuel) {
            return console.log(`${this.PlaneName} don't have enough fuel to travel to this planet`);
        }
        if (this.isDamaged === true || this.isDistroy === true || this.crew < 1) {
            return console.log(`${this.PlaneName} can't fly we have some damage onboard first repair your ship`);
        }
        else {
            this.isWorking = true;
            let that = this;
            console.log(`${that.PlaneName} is traveling to ${planet.PlanetName}`)
            let shipEvents = formulaService.generateEvents(planet.distance * 1000 / this.speed, allEvents)
            let goodEventsBegins = [];
            let bedEventsBegins = [];
            for (i = 0; i < shipEvents.length; i++) {
                if (shipEvents[i] instanceof bedEvents === false) {
                    goodEventsBegins.push(shipEvents[i])
                }
                if (shipEvents[i] instanceof goodEvents === false) {
                    bedEventsBegins.push(shipEvents[i])
                }
            }
            if (goodEventsBegins.length - 1 >= 0) {
                for (const event of goodEventsBegins) {
                    await event.EventStart(that);
                }
            }
            if (bedEventsBegins.length - 1 >= 0) {
                for (const event of bedEventsBegins) {
                    await event.EventStart(that);
                }
            }
            setTimeout(() => {
                that.OnPlanet = planet.PlanetName;
                that.fuel = that.fuel - neededFuel;
                that.dock(planet);
            }, formulaService.timeToTravel(planet, that));
        }
    }
    dock(planet) {
        setTimeout(() => {
            console.log(`${this.PlaneName} is docking on ${planet.PlanetName}`);
            let that = this;
            that.visitedPlanet.push(planet.PlanetName);
            that.numbFlights += 1;
            console.log(that.visitedPlanet);
            that.docketPalent = planet.PlanetName;
            that.stats();
        }, 2000);
    }
    stats() {
        console.log(`${this.PlaneName} currnet stats\n
    Currnet hull : ${this.hull}/${this.maxHull}\n
    Current Fuel : ${this.fuel}/${this.maxFuel}\n
    Currnet Crew : ${this.CrewMembers}\n
    Planets you visited : ${this.visitedPlanet}`)
    }
    SellYourGoods(value) {
        console.log(`${this.CaptainName} is selling`)
        if (value === "gold") {
            if (this.goodsYouhave.gold < 0) {
                return console.log(`${this.CaptainName} you don't have any ${value}`);
            }
            else {
                this.credit += this.goodsYouhave.gold * goodsPrice.gold
            }
        }
        if (value === "bronze") {
            if (this.goodsYouhave.bronze < 0) {
                return console.log(`${this.CaptainName} you don't have any ${value}`);
            }
            else {
                this.credit += this.goodsYouhave.bronze * goodsPrice.bronze;
            }
        }
        if (value === "silver") {
            if (this.goodsYouhave.silver < 0) {
                return console.log(`${this.CaptainName} you don't have any ${value}`);
            }
            else {
                this.credit += this.earnedGoods.silver * goodsPrice.silver;
            }
        }
        if (value === "platinum") {
            if (this.goodsYouhave.platinum < 0) {
                return console.log(`${this.CaptainName} you don't have any ${value}`);
            }
            else {
                this.credit += this.earnedGoods.platinum * goodsPrice.platinum;
            }
        }
        if (value === "dimond") {
            if (this.goodsYouhave.dimond < 0) {
                return console.log(`${this.CaptainName} you don't have any ${value}`);
            }
            else {
                this.credit += this.earnedGoods.dimond * goodsPrice.dimond;
            }
        }
    }
}
console.log()

class Events {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}
class bedEvents extends Events {
    constructor(name, description) {
        super(name, description)
        this.type = "Bed Lucky";
        this.changeCrewStats = formulaService.crewModifier(-3, 0);
        this.fuelChanges = Math.floor(Math.random() * 100 - 100);
        this.hullChanges = Math.floor(Math.random() * 100 - 100);
    }
    EventStart(captain) {
        let that = this
        return new Promise(function (resolve, reject) {
            if (!captain instanceof Captain) {
                reject(`ERROR`);
            }
            console.log(that.changeCrewStats)
            console.log(that.fuelChanges)
            console.log(that.hullChanges)
            setTimeout(() => {

                captain.CrewMembers += that.changeCrewStats;
                captain.fuel += that.fuelChanges;
                captain.hull += that.hullChanges;
                console.log(`Event: ${that.name} Discription: ${that.description}`);
                console.log(`------------------------------`)
                resolve();
            }, 4000);

        })
    }
}
class goodEvents extends Events {
    constructor(name, discription) {
        super(name, discription)
        this.type = "You are Lucky";
        this.changeCrewStats = formulaService.crewModifier(3, 0);
        this.fuelChanges = Math.floor(Math.random() * 200);
        this.hullChanges = Math.floor(Math.random() * 200);
    }
    EventStart(captain) {
        let that = this
        return new Promise(function (resolve, reject) {
            if (!captain instanceof Captain) {
                reject(`ERROR`);
            }
            setTimeout(() => {
                captain.CrewMembers += that.changeCrewStats();
                captain.fuel += that.fuelChanges;
                captain.hull += that.hullChanges;
                console.log(`Event: ${that.name} Discription: ${that.discription}`);
                console.log(`------------------------------`)
                resolve();
            }, 4000);
        })
    }
}
//  Creating all New Objects Instance From Planes / Planets / Events ara Below This line

let allEvents = [
    new bedEvents("Star Storm", "You enter a storm Star Storm your crew is trying to control the ship but you didn't have so much luck"),
    new bedEvents("Pirets on the Radar", "You`r ship is attack by Pirates you mannage to escape but you have some dagamge"),
    new bedEvents("Alian in Camming", "You have been attack by alians from other univers but you defend you ship with some damage"),
    new bedEvents("Theifs", "You have been Robbed!!! The theifs made some damage on ship to"),
    new goodEvents("Friendly Ship", "You meet with your friend captain they ware very polite they give you some gifts"),
    new goodEvents("Abodend Ship", "Captain you found abodend ship they had a good amount of supplys You are lucky one"),
];
console.log(allEvents[4] instanceof bedEvents);
let spaceShips = [
    new Planes("Star Fighter", 0.7, 200, 250, 5, "http://i.4pcdn.org/tg/1401501498020.png", 100),
    new Planes("Distroyer", 0.3, 400, 150, 10, "http://i.4pcdn.org/tg/1401501498020.png", 400),
    new Planes("Transporter Z x48", 0.2, 500, 300, 75, "http://i.4pcdn.org/tg/1401501498020.png", 500),
    new Planes("Star Fighter", 0.7, 200, 250, 5, "http://i.4pcdn.org/tg/1401501498020.png", 200),
    new Planes("Star Fighter", 0.7, 200, 250, 5, "http://i.4pcdn.org/tg/1401501498020.png", 200),
    new Planes("Star Fighter", 0.7, 200, 250, 5, "http://i.4pcdn.org/tg/1401501498020.png", 200),
    new Planes("Star Fighter", 0.7, 200, 250, 5, "http://i.4pcdn.org/tg/1401501498020.png", 200),
];

let CaptainArr = [
    new Captain("Filip", "Donevski", "Defence", 28, "BlackHawks"),
    new Captain("Filip", "Donevski", "Defence", 28, "BlackHawks"),
    new Captain("Filip", "Donevski", "Defence", 28, "BlackHawks"),
    new Captain("Filip", "Donevski", "Defence", 28, "BlackHawks"),
    new Captain("Filip", "Donevski", "Defence", 28, "BlackHawks"),
    new Captain("Filip", "Donevski", "Defence", 28, "BlackHawks"),
    new Captain("Filip", "Donevski", "Defence", 28, "BlackHawks"),
]

let PlanetUniverse = [
    new Planets("Death Star", 2, 405230, 400000, 2),
    new Planets("Death Star", 0.1, 405230, 400000, 2),
    new Planets("Death Star", 0.1, 405230, 400000, 2),
]


setTimeout(() => {
    console.log(CaptainArr[0].buyShip(spaceShips[0]));
    console.log(spaceShips);
    console.log(CaptainArr[0].beginToTravel(PlanetUniverse[0]))
}, 2000);

setTimeout(() => {
    console.log(PlanetUniverse[0].StartWorking(CaptainArr[0]))
    console.log(CaptainArr[0]);
}, 4000);

setTimeout(() => {
    console.log(CaptainArr[0].SellYourGoods("gold"));
    console.log(CaptainArr[0]);
}, 6000);

//--- Section Price for hire refuel repair 
let mentainece = {
    fuel: 50,
    repair: 60,
    crew: 80
};
let goodsPrice = {
    gold: 30,
    silver: 20,
    bronze: 10,
    platinum: 50,
    dimond: 70
}
