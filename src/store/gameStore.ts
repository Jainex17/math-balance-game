import { defineStore } from 'pinia'
import { saveLevelCompletion, getUserProgress } from '../services/firebase'

interface GameLevel {
  levelNumber: number;
  completed: boolean;
  rounds: Array<{
    targetNumber: number;
    availableNumbers: number[];
  }>;
}

interface GameState {
  currentLevel: number;
  currentRound: number;
  levels: GameLevel[];
  totalRounds: number;
  targetNumber: number;
  numberChoices: number[];
  selectedNumbers: number[];
  isSuccess: boolean;
  showLevelComplete: boolean;
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    currentLevel: 1,
    currentRound: 1,
    levels: Array.from({ length: 5 }, (_, i) => ({
      levelNumber: i + 1,
      completed: false,
      rounds: [],
    })),
    totalRounds: 5,
    targetNumber: 0,
    numberChoices: [],
    selectedNumbers: [],
    isSuccess: false,
    showLevelComplete: false,
  }),

  actions: {
    async initializeFromFirebase() {
      try {
        const progress = await getUserProgress();
        if (progress) {
          this.currentLevel = progress.userCurrentLevel || 1;
          
          for (let i = 0; i < this.currentLevel - 1; i++) {
            if (this.levels[i]) {
              this.levels[i].completed = true;
            }
          }
          
          this.initializeLevel(this.currentLevel);
        }
      } catch (error) {
        console.error('Failed to initialize from Firebase:', error);
        this.initializeLevel(1);
      }
    },

    initializeLevel(level: number) {
      this.currentLevel = level;
      this.currentRound = 1;
      this.selectedNumbers = [];
      this.generateRound();    
    },

    generateRound() {
      const level = this.levels[this.currentLevel - 1];
      if (level.rounds.length > 0 && level.rounds[this.currentRound - 1]) {
        const round = level.rounds[this.currentRound - 1];
        this.targetNumber = round.targetNumber;
        this.numberChoices = [...round.availableNumbers];
      } else {
        const difficulty = Math.floor((this.currentLevel - 1) / 3);
        const maxSum = 10 + (difficulty * 5);
        const target = Math.floor(Math.random() * maxSum) + (difficulty + 1) * 5;
        this.targetNumber = target;
        const solution = this.generateSolution(target);
        const others = this.generateOtherNumbers(target, solution, maxSum);
        this.numberChoices = [...solution, ...others].sort(() => Math.random() - 0.5);
      }
    },

    generateSolution(target: number): number[] {
      let num1 = Math.floor(Math.random() * (target - 1)) + 1;
      while(num1 === target - num1) {
        num1 = Math.floor(Math.random() * (target - 1)) + 1;
      }
      return [num1, target - num1];
    },

    generateOtherNumbers(target: number, solution: number[], maxSum: number): number[] {
      const others: number[] = [];
      while (others.length < 4) {
        const num = Math.floor(Math.random() * maxSum) + 1;
        if (!solution.includes(num) && !others.includes(num) && num !== target) {
          others.push(num);
        }
      }
      return others;
    },

    selectNumber(number: number) {
      if (this.selectedNumbers.length < 2) {
        this.selectedNumbers.push(number);
        
        if (this.selectedNumbers.length === 2) {
          this.checkAnswer();
        }
      }
    },

    checkAnswer() {
      const sum = this.selectedNumbers.reduce((a, b) => a + b, 0);
      
      if (sum === this.targetNumber) {
        this.handleCorrectAnswer();
      } else {
        this.handleWrongAnswer();
      }
    },

    handleCorrectAnswer() {
      this.isSuccess = true;
      setTimeout(() => {
        this.isSuccess = false;
        if (this.currentRound < 5) {
          this.currentRound++;
          this.selectedNumbers = [];
          this.generateRound();
        } else {
          this.completeLevel();
        }
      }, 1500);
    },

    handleWrongAnswer() {
      this.selectedNumbers = [];
    },

    async completeLevel() {
        try {
          await Promise.all([
            saveLevelCompletion(this.currentLevel),
          ]);
        } catch (error) {
          console.error('Failed to save level statistics:', error);
        }


      this.levels[this.currentLevel - 1].completed = true;
      this.showLevelComplete = true;
    },

    async moveToNextLevel() {
      if (this.currentLevel < this.levels.length) {
        this.currentLevel++;
        this.currentRound = 1;
        this.selectedNumbers = [];
        this.showLevelComplete = false;
        this.generateRound();
      }
    },

    isLevelUnlocked(level: number): boolean {
      if (level === 1) return true;
      return this.levels[level - 2].completed;
    },

    reset() {
      this.currentLevel = 1;
      this.currentRound = 1;
      this.levels = Array.from({ length: 5 }, (_, i) => ({
        levelNumber: i + 1,
        completed: false,
        rounds: [],
      }));
      this.totalRounds = 5;
      this.targetNumber = 0;
      this.numberChoices = [];
      this.selectedNumbers = [];
      this.isSuccess = false;
      this.showLevelComplete = false;
    },
  },

  getters: {
    completedLevels(): number {
      return this.levels.filter(level => level.completed).length;
    },
    
    currentRoundProgress(): number {
      return ((this.currentRound - 1) / (this.totalRounds)) * 100;
    },
    
  }
})
