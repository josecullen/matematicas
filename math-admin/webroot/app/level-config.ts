
export class Stage{
    constructor(
        public levelConfigs:Array<LevelConfig> = [new LevelConfig()]
        ){}
}


export class LevelConfig {
    constructor(
        public problemConfig: ProblemConfig = new SimpleProblemConfig(),
       	public scoreConfig: ScoreConfig = new ScoreConfig()
    ) { }
}
export enum ProblemType {
    SIMPLE, EQUATION, LOGIC
}

export interface ProblemConfig {
    getType(): ProblemType;
}

export class BasicProblemConfig implements ProblemConfig{
    constructor(
        public repetitions: number = 5,
        public problemType: string = ProblemType[ProblemType.LOGIC]
        ) { }

    getType() {
        return ProblemType[this.problemType];
    }
}

export class LogicProblemConfig extends BasicProblemConfig{
    
    constructor( 
        public operations: string = "and|or|then|eq",
        public form: string = "a + b",
        public sign: number = 0){
        super(3,ProblemType[ProblemType.LOGIC]);
    }
}


export class SimpleProblemConfig implements ProblemConfig {
    constructor(
        public variableConfigs: Array<VariableConfig> = [new VariableConfig()],
        public form: string = "a + b",
        public operations: string = "+-"´,
        public repetitions: number = 5,
        public problemType: string = ProblemType[ProblemType.SIMPLE]
        ) { }

    getType() {
        return ProblemType.SIMPLE;
    }
}


export class EquationProblemConfig implements ProblemConfig {
    constructor(
        public variableConfigs: Array<VariableConfig> = [new VariableConfig(), new VariableConfig()],
        public repetitions: number = 5,
        public problemType: string = ProblemType[ProblemType.EQUATION],
        public level:number = 2
        ) { }

    getType() {
        return ProblemType.EQUATION;
    }
}

class VariableConfig {
    constructor(
        public min: number = 1,
        public max: number = 5,
        public sign: number = 0,
        public divisionFactor: number = 1
        ) { }
}

class ScoreConfig {
    constructor(
        public baseScore: number = 10,
        public extras: Array<ExtraScore> = [
            new ExtraScore("Perfecto", 5, 5, 5),
            new ExtraScore("Muy bien", 7, 3, 3),
            new ExtraScore("Bien", 10, 0, 1)
        ],
        public preCount: number = 0,
        public withTime: boolean = true
        ) { }
}

export class ExtraScore {
    constructor(
        public name: string = "Perfecto",
        public thresholdTime: number = 5,
        public extraTime: number = 5,        
        public extraScore: number = 5
        ) { }
}