import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import './timer.js';
import './drag.js';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-clique',
  templateUrl: './clique.component.html',
  styleUrl: './clique.component.css'
})
export class CliqueComponent implements OnInit {
  
  departements: { [key: string]: string[] } = {};
  departementsInverse: { [nom: string]: string } = {};
  questions: string[] = [];
  currentDpt: string = '';
  numberOfQuestions: number = 0;
  currentQuestionErrors: number = 0;
  currentQuestionErrorsArray: any[] = [];
  score: number = 0;
  finalScore: number = 0;
  timeBonus: number = 0;
  ended: boolean = false;
  departementStats: { [key: string]: { startTime: number, endTime: number, errors: number } } = {};
  statsItems: { name: string, time: number, errors: number }[] = [];
  liStats: NodeListOf<HTMLLIElement>;

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle("France | Clique");
    this.liStats = document.querySelectorAll('.stats-item');
  }

  ngOnInit(): void {

    this.departements = {
      "01": ["Ain", "Auvergne-Rhône-Alpes", "Bourg-en-Bresse"],
      "02": ["Aisne", "Hauts-de-France", "Laon"],
      "03": ["Allier", "Auvergne-Rhône-Alpes", "Moulins"],
      "04": ["Alpes-de-Haute-Provence", "Provence-Alpes-Côte d'Azur", "Digne-les-Bains"],
      "05": ["Hautes-Alpes", "Provence-Alpes-Côte d'Azur", "Gap"],
      "06": ["Alpes-Maritimes", "Provence-Alpes-Côte d'Azur", "Nice"],
      "07": ["Ardèche", "Auvergne-Rhône-Alpes", "Privas"],
      "08": ["Ardennes", "Grand Est", "Charleville-Mézières"],
      "09": ["Ariège", "Occitanie", "Foix"],
      "10": ["Aube", "Grand Est", "Troyes"],
      "11": ["Aude", "Occitanie", "Carcassonne"],
      "12": ["Aveyron", "Occitanie", "Rodez"],
      "13": ["Bouches-du-Rhône", "Provence-Alpes-Côte d'Azur", "Marseille"],
      "14": ["Calvados", "Normandie", "Caen"],
      "15": ["Cantal", "Auvergne-Rhône-Alpes", "Aurillac"],
      "16": ["Charente", "Nouvelle-Aquitaine", "Angoulême"],
      "17": ["Charente-Maritime", "Nouvelle-Aquitaine", "La Rochelle"],
      "18": ["Cher", "Centre-Val de Loire", "Bourges"],
      "19": ["Corrèze", "Nouvelle-Aquitaine", "Tulle"],
      "2A": ["Corse-du-Sud", "Corse", "Ajaccio"],
      "2B": ["Haute-Corse", "Corse", "Bastia"],
      "21": ["Côte-d'Or", "Bourgogne-Franche-Comté", "Dijon"],
      "22": ["Côtes-d'Armor", "Bretagne", "Saint-Brieuc"],
      "23": ["Creuse", "Nouvelle-Aquitaine", "Guéret"],
      "24": ["Dordogne", "Nouvelle-Aquitaine", "Périgueux"],
      "25": ["Doubs", "Bourgogne-Franche-Comté", "Besançon"],
      "26": ["Drôme", "Auvergne-Rhône-Alpes", "Valence"],
      "27": ["Eure", "Normandie", "Évreux"],
      "28": ["Eure-et-Loir", "Centre-Val de Loire", "Chartres"],
      "29": ["Finistère", "Bretagne", "Quimper"],
      "30": ["Gard", "Occitanie", "Nîmes"],
      "31": ["Haute-Garonne", "Occitanie", "Toulouse"],
      "32": ["Gers", "Occitanie", "Auch"],
      "33": ["Gironde", "Nouvelle-Aquitaine", "Bordeaux"],
      "34": ["Hérault", "Occitanie", "Montpellier"],
      "35": ["Ille-et-Vilaine", "Bretagne", "Rennes"],
      "36": ["Indre", "Centre-Val de Loire", "Châteauroux"],
      "37": ["Indre-et-Loire", "Centre-Val de Loire", "Tours"],
      "38": ["Isère", "Auvergne-Rhône-Alpes", "Grenoble"],
      "39": ["Jura", "Bourgogne-Franche-Comté", "Lons-le-Saunier"],
      "40": ["Landes", "Nouvelle-Aquitaine", "Mont-de-Marsan"],
      "41": ["Loir-et-Cher", "Centre-Val de Loire", "Blois"],
      "42": ["Loire", "Auvergne-Rhône-Alpes", "Saint-Étienne"],
      "43": ["Haute-Loire", "Auvergne-Rhône-Alpes", "Le Puy-en-Velay"],
      "44": ["Loire-Atlantique", "Pays de la Loire", "Nantes"],
      "45": ["Loiret", "Centre-Val de Loire", "Orléans"],
      "46": ["Lot", "Occitanie", "Cahors"],
      "47": ["Lot-et-Garonne", "Nouvelle-Aquitaine", "Agen"],
      "48": ["Lozère", "Occitanie", "Mende"],
      "49": ["Maine-et-Loire", "Pays de la Loire", "Angers"],
      "50": ["Manche", "Normandie", "Saint-Lô"],
      "51": ["Marne", "Grand Est", "Châlons-en-Champagne"],
      "52": ["Haute-Marne", "Grand Est", "Chaumont"],
      "53": ["Mayenne", "Pays de la Loire", "Laval"],
      "54": ["Meurthe-et-Moselle", "Grand Est", "Nancy"],
      "55": ["Meuse", "Grand Est", "Bar-le-Duc"],
      "56": ["Morbihan", "Bretagne", "Vannes"],
      "57": ["Moselle", "Grand Est", "Metz"],
      "58": ["Nièvre", "Bourgogne-Franche-Comté", "Nevers"],
      "59": ["Nord", "Hauts-de-France", "Lille"],
      "60": ["Oise", "Hauts-de-France", "Beauvais"],
      "61": ["Orne", "Normandie", "Alençon"],
      "62": ["Pas-de-Calais", "Hauts-de-France", "Arras"],
      "63": ["Puy-de-Dôme", "Auvergne-Rhône-Alpes", "Clermont-Ferrand"],
      "64": ["Pyrénées-Atlantiques", "Nouvelle-Aquitaine", "Pau"],
      "65": ["Hautes-Pyrénées", "Occitanie", "Tarbes"],
      "66": ["Pyrénées-Orientales", "Occitanie", "Perpignan"],
      "67": ["Bas-Rhin", "Grand Est", "Strasbourg"],
      "68": ["Haut-Rhin", "Grand Est", "Colmar"],
      "69": ["Rhône", "Auvergne-Rhône-Alpes", "Lyon"],
      "70": ["Haute-Saône", "Bourgogne-Franche-Comté", "Vesoul"],
      "71": ["Saône-et-Loire", "Bourgogne-Franche-Comté", "Mâcon"],
      "72": ["Sarthe", "Pays de la Loire", "Le Mans"],
      "73": ["Savoie", "Auvergne-Rhône-Alpes", "Chambéry"],
      "74": ["Haute-Savoie", "Auvergne-Rhône-Alpes", "Annecy"],
      "75": ["Paris", "Île-de-France", "Paris"],
      "76": ["Seine-Maritime", "Normandie", "Rouen"],
      "77": ["Seine-et-Marne", "Île-de-France", "Melun"],
      "78": ["Yvelines", "Île-de-France", "Versailles"],
      "79": ["Deux-Sèvres", "Nouvelle-Aquitaine", "Niort"],
      "80": ["Somme", "Hauts-de-France", "Amiens"],
      "81": ["Tarn", "Occitanie", "Albi"],
      "82": ["Tarn-et-Garonne", "Occitanie", "Montauban"],
      "83": ["Var", "Provence-Alpes-Côte d'Azur", "Toulon"],
      "84": ["Vaucluse", "Provence-Alpes-Côte d'Azur", "Avignon"],
      "85": ["Vendée", "Pays de la Loire", "La Roche-sur-Yon"],
      "86": ["Vienne", "Nouvelle-Aquitaine", "Poitiers"],
      "87": ["Haute-Vienne", "Nouvelle-Aquitaine", "Limoges"],
      "88": ["Vosges", "Grand Est", "Épinal"],
      "89": ["Yonne", "Bourgogne-Franche-Comté", "Auxerre"],
      "90": ["Territoire de Belfort", "Bourgogne-Franche-Comté", "Belfort"],
      "91": ["Essonne", "Île-de-France", "Évry"],
      "92": ["Hauts-de-Seine", "Île-de-France", "Nanterre"],
      "93": ["Seine-Saint-Denis", "Île-de-France", "Bobigny"],
      "94": ["Val-de-Marne", "Île-de-France", "Créteil"],
      "95": ["Val-d'Oise", "Île-de-France", "Cergy"],
    };

    for (const numDept in this.departements) {
      const nomDept = this.departements[numDept][0];
      this.departementsInverse[nomDept] = numDept;
    }

    this.questions = [
      "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
      "11", "12", "13", "14", "15", "16", "17", "18", "19", "2A", 
      "2B", "21", "22", "23", "24", "25", "26", "27", "28", "29",
      "2A", "30", "31", "32", "33", "34", "35", "36", "37", "38",
      "39", "40", "41", "42", "43", "44", "45", "46", "47", "48",
      "49", "50", "51", "52", "53", "54", "55", "56", "57", "58",
      "59", "60", "61", "62", "63", "64", "65", "66", "67", "68",
      "69", "70", "71", "72", "73", "74", "75", "76", "77", "78",
      "79", "80", "81", "82", "83", "84", "85", "86", "87", "88",
      "89", "90", "91", "92", "93", "94", "95"
    ];
    
    const startOverlay = document.getElementById("clic_nom_overlay");
    if (startOverlay) {
      startOverlay.style.display = "flex";
    }
    this.colorier();
    const map = document.getElementById("mapOignon");
    if(map) {
      map.style.opacity = "0";
    }
  }

  navigateToHome() {
    const results_element = document.getElementById('clic-nom-results');
    if (results_element) {
      results_element.style.display = "none";
      (window as any).resetTimer();
      this.router.navigate(['/']);
    }
  }

  colorier() {
    Object.keys(this.departements).forEach(departementNum => {
      const departementInfo = this.departements[departementNum];
      const element = document.getElementById(`dep-${departementNum}`);
      if (element) {
        element.addEventListener("click", () => {

          if (!this.ended) {

            if(departementNum !== this.currentDpt) {
              this.currentQuestionErrors++;
              this.currentQuestionErrorsArray.push({});
            }
            if (departementNum !== this.currentDpt && this.currentQuestionErrors !== 3) {    
              return;
            }
            
            switch (this.currentQuestionErrors) {
              case 0:
                this.score += 2000;
                break;
              case 1:
                this.score += 1000;
                break;
              case 2:
                this.score += 500;
                break;
              case 3:
                this.clignote(this.currentDpt);
                break;
            }

            if ((this.currentDpt in this.departementStats)) {
              this.departementStats[this.currentDpt].endTime = performance.now();
              this.departementStats[this.currentDpt].errors = this.currentQuestionErrors;
            }
          
            this.currentQuestionErrorsArray = [];

            const score = document.getElementById("score");
            if(score) {
              score.textContent = `Score : ${this.score}`;
            }

            const title = document.getElementById("title");
            const nomDpt = document.getElementById("dpt");
            const countQuestions = document.getElementById("title-count");
             // Désactiver les clics sur tous les départements pendant le délai
            Object.keys(this.departements).forEach(dptNum => {
              const dptElement = document.getElementById(`dep-${dptNum}`);
              if (dptElement) {
                dptElement.style.pointerEvents = "none";
              }
            });
      
            if(nomDpt && countQuestions && title) {
              title.textContent = ''
              nomDpt.textContent = ''
              countQuestions.textContent = '';
            }

            //20 questions passées
            if(this.numberOfQuestions + 1 == 21){
              this.ended = true;    
              let timeLeft = document.getElementById('base-timer-label')?.textContent || '0';
              (window as any).resetTimer();
              this.displayResults(timeLeft);
            }

            setTimeout(() => {

              // Réactiver les clics sur tous les départements après le délai
              Object.keys(this.departements).forEach(dptNum => {
                const dptElement = document.getElementById(`dep-${dptNum}`);
                if (dptElement) {
                  dptElement.style.pointerEvents = "auto";
                }
              });

              this.removeCurrentQuestion();
              this.updateQuestionsDisplay();
            }, 1400);
        
          }
        });
        
        element.addEventListener("mouseover", () => {
          element.style.fillOpacity = "0.5";
        });
        
        element.addEventListener("mouseout", () => {
          element.style.fillOpacity = "1";
        });
        
        switch (departementInfo[1]) {
          case "Auvergne-Rhône-Alpes":
            element.style.fill = "#1f77b4"; // Bleu
            break;
          case "Bourgogne-Franche-Comté":
            element.style.fill = "#ff7f0e"; // Orange
            break;
          case "Bretagne":
            element.style.fill = "#2ca02c"; // Vert
            break;
          case "Centre-Val de Loire":
            element.style.fill = "#d62728"; // Rouge
            break;
          case "Corse":
            element.style.fill = "#9467bd"; // Violet
            break;
          case "Grand Est":
            element.style.fill = "#8c564b"; // Marron
            break;
          case "Hauts-de-France":
            element.style.fill = "#e377c2"; // Rose
            break;
          case "Île-de-France":
            element.style.fill = "#7f7f7f"; // Gris
            break;
          case "Normandie":
            element.style.fill = "#bcbd22"; // Jaune
            break;
          case "Nouvelle-Aquitaine":
            element.style.fill = "#17becf"; // Turquoise
            break;
          case "Occitanie":
            element.style.fill = "#9edae5"; // Bleu clair
            break;
          case "Pays de la Loire":
            element.style.fill = "#98df8a"; // Vert clair
            break;
          case "Provence-Alpes-Côte d'Azur":
            element.style.fill = "#ff9896"; // Rouge clair
            break;
          default:
            element.style.fill = "rgb(235, 209, 155)";
        }

      }

    });

  }

  init() {
    const score = document.getElementById("score");
    const record = document.getElementById("record");
    if(score && record) {
      score.textContent = `Score : ${this.score}`;

      const recordClic = localStorage.getItem('recordClic');

      if (recordClic === null) {
        record.textContent = 'Record : 0';
      } else {
        const recordScore = parseInt(recordClic, 10);
        record.textContent = 'Record : ' + `${recordScore}`;
      }
    }
    
    const startOverlay = document.getElementById("clic_nom_overlay");
    const startContent = document.getElementById("clic_nom_content");
    if (startOverlay && startContent) {
      startOverlay.style.display = "none";
      startContent.style.display = "none";
    }

    this.updateQuestionsDisplay();
    
    const timer = document.getElementById("timer");
    const container = document.getElementById("container");
    const map = document.getElementById("mapOignon");

    if(timer && container && map) {
      timer.style.display = "flex";
      container.style.display = "flex";
      container.style.background = "#e2f9ff";
      container.style.borderRadius = "15px";   
      container.style.boxShadow = "1px 3px 1px rgba(0, 0, 0, 0.2)";
      map.style.opacity = "1";
    }

    (window as any).startTimer();

    document.addEventListener('timerEnd', () => {
      this.ended = true;
      this.displayResults()
    });

  }

  // Méthode pour supprimer la question actuelle de la liste des questions
  removeCurrentQuestion() {
    const index = this.questions.indexOf(this.currentDpt);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }

  // Méthode pour actualiser l'affichage des questions après chaque sélection
  updateQuestionsDisplay() {
    if (this.questions.length > 0 && this.numberOfQuestions < 20 && !this.ended) {
      this.numberOfQuestions++;
      this.currentQuestionErrors = 0;
      this.currentQuestionErrorsArray = [];

      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.currentDpt = this.questions[randomIndex];

      const nomDpt = document.getElementById("dpt");
      const countQuestions = document.getElementById("title-count");

      if(nomDpt && countQuestions) {
        nomDpt.textContent = `${this.departements[this.currentDpt][0]}`;
        countQuestions.textContent = `${this.numberOfQuestions}/20`;
      }

      this.departementStats[this.currentDpt] = {
        startTime: performance.now(),
        endTime: 0,
        errors: 0
      };
      

    }
  }

  displayResults(timeLeft: string = '0') {
    const timeLeftNumber: number = parseFloat(timeLeft);
    const timeBonusScore: number = Math.floor((timeLeftNumber / 3) * 1000);
    const finalScore: number = this.score + timeBonusScore;
    this.finalScore = finalScore;

    const container = document.getElementById("container");
    const scoreText = document.getElementById("score");
    const record = document.getElementById("record");
    const timer = document.getElementById("timer");
    const countQuestions = document.getElementById("title-count");
    const nomDpt = document.getElementById("dpt");
    //const map = document.getElementById("mapOignon");
    this.currentQuestionErrors = 0;
    this.currentQuestionErrorsArray = [];

    if (container && scoreText && record && timer && countQuestions && nomDpt) {
      container.style.background = "none";
      container.style.borderRadius = "none";   
      container.style.boxShadow = "none"; 
      //map.style.opacity = "0";

      timer.style.display = "none";
      scoreText.textContent = "";
      record.textContent = "";
      countQuestions.textContent = "";
      nomDpt.textContent = "";
    }

    const results_element = document.getElementById('clic-nom-results');
    const title = document.getElementById('score-title-value');
    const score = document.querySelector('.fa.fa-map');
    const timeBonus = document.querySelector('.fa.fa-hourglass');
    const tempsMoyen = document.getElementById('temps-moyen');
    const notBest = document.getElementById('note-not-best');
    const best = document.getElementById('note-best');
    const overlay = document.getElementById("clic_nom_overlay");

    if (results_element && title && score && timeBonus && tempsMoyen && notBest && best && overlay) {

      results_element.classList.add('slideUpAnimation');
      results_element.style.display = "flex";
      setTimeout(() => {
        results_element.classList.remove("slideUpAnimation");
        results_element.style.bottom = "24.95%";
      }, 1500);

      overlay.style.display = "flex";
      title.textContent = `${finalScore}`;
      score.textContent = ' : ' + `${this.score}` + ' pts';
      timeBonus.textContent = ' : ' + `${timeBonusScore}` + ' pts';

      tempsMoyen.textContent = this.calculateAverageTime();

      const recordClic = localStorage.getItem('recordClic');

      if (recordClic === null) {
        localStorage.setItem('recordClic', `${finalScore}`);
        notBest.style.display = 'none';
      } else {
        const recordScore = parseInt(recordClic, 10);
        if (finalScore > recordScore) {
          localStorage.setItem('recordClic', `${finalScore}`);
          notBest.style.display = 'none';
        } else {
          best.style.display = 'none';
        }
      }
    }
  }

  openStats() {
    this.statsItems = [];

    for (const dptNum in this.departementStats) {
        const stat = this.departementStats[dptNum];
        if (stat.endTime > 0) {
            const dptName = this.departements[dptNum][0];
            const timeInSeconds = (stat.endTime - stat.startTime) / 1000;

            // Générer les symboles en fonction du nombre d'erreurs
            let symbols = "";
            for (let i = 0; i < stat.errors; i++) {
                symbols += '<i class="fa fa-times-circle red"></i>';
            }
            if (stat.errors < 3) {
                symbols += '<i class="fa fa-check-circle green"></i>';
            }

            // Ajouter l'élément aux données de statistiques
            this.statsItems.push({ name: dptName, time: timeInSeconds, errors: stat.errors });
        }
    }

    const results = document.getElementById("clic-nom-results");
    const stats = document.getElementById("stats-overlay");

    if(results && stats) {
      results.style.display = 'none';

      stats.classList.add('fade-in');
      stats.style.display = 'flex';
      stats.style.flexDirection = 'column';
    }

    setTimeout(() => {
      this.liStats = document.querySelectorAll('.stats-item');
      this.addClickEvent();
    }, 100);

  }

  closeStats() {
    const results = document.getElementById("clic-nom-results");
    const stats = document.getElementById("stats-overlay");

    if(results && stats) {

      stats.classList.add('fade-out');

      setTimeout(() => {
        stats.style.display = 'none';
        stats.classList.remove('fade-out');
    }, 800);

    results.classList.add('fade-in');
    results.style.display = "flex";
    }

    this.removeClickEvent();
  }

  addClickEvent() {
    this.liStats.forEach(item => {
        item.addEventListener('click', this.clickHandler);
    });
  }

  removeClickEvent() {
      this.liStats.forEach(item => {
          item.removeEventListener('click', this.clickHandler);
      });
  }

  clickHandler = (event: MouseEvent) => {
    const departmentName = (event.currentTarget as HTMLLIElement).textContent?.split(' - ')[0]?.trim();
    if (departmentName && this.departementsInverse.hasOwnProperty(departmentName)) {
      const departmentNumber = this.departementsInverse[departmentName];
      this.clignote(departmentNumber);
    }
  }

  calculateAverageTime() {
    const tempsParDepartement: number[] = [];

    // Parcourir chaque département dans departementStats
    for (const dptNum in this.departementStats) {
        const stat = this.departementStats[dptNum];
        if (stat.endTime > 0) {
            // Calculer la différence entre le temps de fin et le temps de début en secondes
            const timeInSeconds = (stat.endTime - stat.startTime) / 1000;
            tempsParDepartement.push(timeInSeconds);
        }
    }
    const moyenne = tempsParDepartement.reduce((total, time) => total + time, 0) / tempsParDepartement.length;

    if(!moyenne) {
      return 'Temps moyen : 0 s'
    }
    return `Temps moyen : ${moyenne.toFixed(3)} s`;
}

  copyResults() {
    const copyText = `J'ai obtenu le score de ${this.finalScore} sur ` + window.location.href + ` ! \n` ;
    navigator.clipboard.writeText(copyText);

    const notification = document.createElement('div');
    notification.textContent = 'Copié dans le presse-papiers.';

    const notificationContainer = document.getElementById('notification-container');

    if (notificationContainer) {
      notificationContainer.appendChild(notification);
      notificationContainer.style.bottom = '-4em';
      notificationContainer.style.opacity = '0';

      setTimeout(function () {
        notificationContainer.style.bottom = '2em';
          notificationContainer.style.opacity = '1';
      }, 10);

      setTimeout(function () {

        notificationContainer.style.bottom = '-4em';
        notificationContainer.style.opacity = '0';

          setTimeout(function () {
            notificationContainer.removeChild(notification);
          }, 500);
      }, 1000);
    }
  }

  clignote(departementNum: string) {
    const element = document.getElementById(`dep-${departementNum}`);
    if (element) {
        let count = 0;
        const interval = setInterval(() => {
            if (count % 2 === 0) {
                element.style.fill = "white";

            } else {

              switch (this.departements[departementNum][1]) {
                case "Auvergne-Rhône-Alpes":
                  element.style.fill = "#1f77b4"; // Bleu
                  break;
                case "Bourgogne-Franche-Comté":
                  element.style.fill = "#ff7f0e"; // Orange
                  break;
                case "Bretagne":
                  element.style.fill = "#2ca02c"; // Vert
                  break;
                case "Centre-Val de Loire":
                  element.style.fill = "#d62728"; // Rouge
                  break;
                case "Corse":
                  element.style.fill = "#9467bd"; // Violet
                  break;
                case "Grand Est":
                  element.style.fill = "#8c564b"; // Marron
                  break;
                case "Hauts-de-France":
                  element.style.fill = "#e377c2"; // Rose
                  break;
                case "Île-de-France":
                  element.style.fill = "#7f7f7f"; // Gris
                  break;
                case "Normandie":
                  element.style.fill = "#bcbd22"; // Jaune
                  break;
                case "Nouvelle-Aquitaine":
                  element.style.fill = "#17becf"; // Turquoise
                  break;
                case "Occitanie":
                  element.style.fill = "#9edae5"; // Bleu clair
                  break;
                case "Pays de la Loire":
                  element.style.fill = "#98df8a"; // Vert clair
                  break;
                case "Provence-Alpes-Côte d'Azur":
                  element.style.fill = "#ff9896"; // Rouge clair
                  break;
                default:
                  element.style.fill = "rgb(235, 209, 155)";
                
              }   
            }

            count++;
            if (count === 4) {
                clearInterval(interval);
            }
        }, 250);
    }
  }

  replay() {
    this.ended = false;
    this.questions = [
      "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
      "11", "12", "13", "14", "15", "16", "17", "18", "19", "2A", 
      "2B", "21", "22", "23", "24", "25", "26", "27", "28", "29",
      "2A", "30", "31", "32", "33", "34", "35", "36", "37", "38",
      "39", "40", "41", "42", "43", "44", "45", "46", "47", "48",
      "49", "50", "51", "52", "53", "54", "55", "56", "57", "58",
      "59", "60", "61", "62", "63", "64", "65", "66", "67", "68",
      "69", "70", "71", "72", "73", "74", "75", "76", "77", "78",
      "79", "80", "81", "82", "83", "84", "85", "86", "87", "88",
      "89", "90", "91", "92", "93", "94", "95"
    ];  
    this.numberOfQuestions = 0;
    this.currentDpt = '';
    this.score = 0;
    this.finalScore = 0;
    this.timeBonus = 0;
    this.departementStats = {};

    (window as any).resetTimer();

    const start = document.getElementById('clic_nom_content');
    const results_element = document.getElementById('clic-nom-results');
    const startOverlay = document.getElementById("clic_nom_overlay");
    const statsOverlay = document.getElementById("stats-overlay");

    if (results_element && start && startOverlay && statsOverlay) {

      results_element.style.display = "none";
      results_element.style.bottom = "0%";
      results_element.classList.remove('fade-in');
      start.style.display = "flex";
      startOverlay.style.display = "flex";
      statsOverlay.style.top = "50%";
      statsOverlay.style.left = "20%";
      statsOverlay.style.transform = "translate(-20%, -50%)";
    }

  }

}
