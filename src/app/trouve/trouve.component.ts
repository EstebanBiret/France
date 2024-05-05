import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-trouve',
  templateUrl: './trouve.component.html',
  styleUrl: './trouve.component.css'
})
export class TrouveComponent {

  departements: { [key: string]: string[] } = {};
  searchTerm: string = '';
  filteredDepartements: { key: string, value: string[] }[] = [];

  questions: string[] = [];
  currentDpt: string = '';
  ended: boolean = false;
  clignotement: boolean = false;
  clignotementInterval: any;

  foundDepartmentsCount: number = 0;
  skippedDepartmentsCount: number = 0;

  constructor(private router: Router, private titleService: Title) {
    this.titleService.setTitle("France | Trouve");
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
    
    const startOverlay = document.getElementById("trouve_nom_overlay");
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
    const results_element = document.getElementById('results-container');
    if (results_element) {
      results_element.style.display = "none";
      this.router.navigate(['/']);
    }
  }

  colorier() {
    Object.keys(this.departements).forEach(departementNum => {
      const departementInfo = this.departements[departementNum];
      const element = document.getElementById(`dep-${departementNum}`);
      if (element) {
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
    
    const startOverlay = document.getElementById("trouve_nom_overlay");
    const startContent = document.getElementById("trouve_nom_content");
    if (startOverlay && startContent) {
      startOverlay.style.display = "none";
      startContent.style.display = "none";
    }

    const inputDpt = document.getElementById("input-dpt");
    const input = document.getElementById("input");
    const container = document.getElementById("container");
    const questionContainer = document.getElementById("question-container");
    const skip = document.getElementById("skip");
    const map = document.getElementById("mapOignon");

    if(inputDpt && input && container && questionContainer && skip && map) {
      inputDpt.style.background = "#e2f9ff";
      inputDpt.style.borderRadius = "15px";   
      inputDpt.style.boxShadow = "1px 3px 1px rgba(0, 0, 0, 0.2)";

      container.style.display = "flex";
      questionContainer.style.display = "flex";

      input.style.display = "flex";

      skip.style.display = "flex";
      
      map.style.opacity = "1";
    }

    this.updateQuestionsDisplay();
  }

  filterDepartements() {
    const inputValue = this.normalizeString((document.getElementById('input') as HTMLInputElement).value).toLowerCase();
    if (inputValue === '') {
      this.filteredDepartements = [];
    } else {
      this.filteredDepartements = Object.entries(this.departements)
        .filter(([key, value]) => this.normalizeString(value[0]).toLowerCase().includes(inputValue))
        .map(([key, value]) => ({ key, value }));
    }
  }
  
  normalizeString(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  skip() {
    this.skippedDepartmentsCount++;
    this.updateQuestionsDisplay()
  }

  updateQuestionsDisplay() {

    const index = this.questions.indexOf(this.currentDpt);
    if (index !== -1) {
      this.questions.splice(index, 1);
    }

    if (this.questions.length === 0) {
      this.ended = true;
      this.stopClignote();
      this.displayResults();
      return;
    }

    if (this.questions.length > 0 && !this.ended) {
      this.stopClignote();

      const element = document.getElementById(`dep-${this.currentDpt}`);
      if (element) {
        
        switch (this.departements[this.currentDpt][1]) {
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

      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.currentDpt = this.questions[randomIndex];
      this.clignote(this.currentDpt);
    }
  }
  
  selectDepartement(departement: { key: string, value: string[] }) {
    const inputElement = document.getElementById('input') as HTMLInputElement;

    if (departement.key === this.currentDpt) {
      inputElement.value = '';
      inputElement.focus();
      this.filteredDepartements = [];
      this.foundDepartmentsCount++;
      this.updateQuestionsDisplay();
      return;
    }

    inputElement.value = departement.value[0];
    this.filteredDepartements = []; 
    inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length;
    inputElement.focus();
    this.wrong();
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.filteredDepartements.length > 0) {
      const inputElement = document.getElementById('input') as HTMLInputElement;
      inputElement.value = this.filteredDepartements[0].value[0];
      let selectedDepartementNumber = '';

      for (const [dptNum, dptInfo] of Object.entries(this.departements)) {
        if (dptInfo[0] === inputElement.value) {
          selectedDepartementNumber = dptNum;
          break;
        }
      }

      if (selectedDepartementNumber === this.currentDpt) {
        inputElement.value = '';
        inputElement.focus();
        this.filteredDepartements = [];
        this.foundDepartmentsCount++;
        this.updateQuestionsDisplay();
        return;
      }

      this.filteredDepartements = [];
      this.wrong();
    }
    else if (event.key === 'Enter' && this.filteredDepartements.length == 0) {
      this.wrong();
    }
    
  }

  wrong() {
    const inputElement = document.getElementById('input') as HTMLInputElement;
    inputElement.classList.add('wrong');
    setTimeout(() => {
      inputElement.classList.remove('wrong');
    }, 700);
  }

  displayResults() {
    this.stopClignote();

    const container = document.getElementById("container");
    const map = document.getElementById("mapOignon");

    if (container && map) {
      container.style.display = "none";
      map.style.opacity = "0";
    }

    const results_element = document.getElementById('results-container');
    const overlay = document.getElementById("trouve_nom_overlay");

    if (results_element && overlay) {
      results_element.style.display = "flex";
      results_element.classList.add('slideUpAnimation');
      setTimeout(() => {
        results_element.classList.remove("slideUpAnimation");
        results_element.style.bottom = "32%";
      }, 1500);

      overlay.style.display = "flex";
    }
  }
  
  clignote(departementNum: string) {
    const element = document.getElementById(`dep-${departementNum}`);
    if (element) {

      let count = 0;
      this.clignotementInterval = setInterval(() => {

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
      }, 500);
    }
  }

  stopClignote() {
    clearInterval(this.clignotementInterval);
  }

  copyResults() {
    const copyText = `J'ai trouvé ${this.foundDepartmentsCount} départements sur ` + window.location.href + ` ! \n` ;
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

    this.currentDpt = '';
    this.stopClignote();
    this.colorier();
    this.foundDepartmentsCount = 0;
    this.skippedDepartmentsCount = 0;

    const start = document.getElementById('trouve_nom_content');
    const results_element = document.getElementById('results-container');
    const startOverlay = document.getElementById("trouve_nom_overlay");

    if (results_element && start && startOverlay) {

      results_element.style.display = "none";
      results_element.style.bottom = "0%";
      results_element.classList.remove('fade-in');
      start.style.display = "flex";
      startOverlay.style.display = "flex";
    }

  }

}
