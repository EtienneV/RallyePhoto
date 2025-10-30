import { Component, OnInit, Input, OnChanges } from '@angular/core';

export interface PeriodicElement {
  id: number;
  item: string;
  points: number;
  comment?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, item: "Passer la bague de foulard au doigt d'un.e inconnu.e", points: 600},
  {id: 10, item: "Un aventurier en train de faire un chi fou mi avec le boulanger du quartier", points: 600},
  {id: 10, item: "Un aventurier en train de faire du tobbogan", points: 600},
  {id: 10, item: "Tous les aventuriers devant une église du quartier", points: 600},
  {id: 10, item: "Toute l'équipe en train de faire un câlin à un arbre", points: 600},
  {id: 10, item: "Un drapeau de Lyon", points: 600},
  {id: 10, item: "Une recette familiale d'une mamie du quartier", points: 600},
  {id: 10, item: "Une recette familiale d'une mamie du quartier", points: 600},
  {id: 10, item: "Une plaque de rue ou une enseigne avec le nom d'une des Terres de Lyon Levant", points: 600},
  {id: 10, item: "Une autre association de scoutisme", points: 600},
  {id: 10, item: "Une carte de visite d'une librairie", points: 600},
  {id: 10, item: "Le menu d'un restaurant", points: 600},
  {id: 10, item: "La carte de visite d'un photographe", points: 600},
  {id: 10, item: "Toute l'équipe jouant à saute-mouton dans un parc", points: 600},
  {id: 10, item: "Le maire de la ville", points: 600},
  {id: 10, item: "Une course de caddies", points: 600},
  {id: 10, item: "Un explorateur en train de regongler les pneus du vélo d'un inconnu", points: 600},
  {id: 10, item: "Un senior tenant sa carte d'identitée (concours du plus vieux)", points: 600},
  {id: 10, item: "L'équipe avec un agent de police", points: 600},
  {id: 10, item: "Des passants en train de faire une course de brouettes", points: 600},
  {id: 10, item: "Photo de Fourvière", points: 600},
  {id: 10, item: "Des installes en alumettes", points: 600},
  {id: 10, item: "un spécimen animal jamais répertorié", points: 600},
  {id: 10, item: "Jouer à la marelle devant l'école du quartier", points: 600},
  {id: 10, item: "Offrir des fleurs à une passante", points: 600},
  {id: 10, item: "Récupérer 5 feuilles d'espèces végétales différentes", points: 600},
  {id: 10, item: "Un numéro de rue 19 (comme les 19 groupes de LL)", points: 600},
  {id: 10, item: "Chanter la prière scoute en respectant les gestes barrières", points: 600},
  {id: 10, item: "Un foulard géant fait de foulards noués ensemble", points: 600},
  {id: 10, item: "Concours de beauté des foulards ", points: 600},
  {id: 10, item: "Ramasser les déchets de toute une rue", points: 600},
  {id: 10, item: "Une oeuvre de street art", points: 600},
  {id: 10, item: "Un aventurier imitant la pose d'une statue du quartier", points: 600},
  {id: 10, item: "L'un des trois fleuves Lyonnais", points: 600},
  {id: 10, item: "Un musicien", points: 600},
  {id: 10, item: "Un tracteur", points: 600},
  {id: 10, item: "Une paire de jumelles", points: 600},
  {id: 10, item: "La poste", points: 600}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RallyePhoto';

  displayedColumns: string[] = ['id', 'item', 'points', 'comment'];
  dataSource = ELEMENT_DATA;

  public isCollapsed = false;

  public percentExplorer = 0;
  public percentExplorerCss = "calc(" + this.percentExplorer + "% - 18px)";

  public dDay = true;

  public groupe;
  public terre;

  ngOnInit() {
    const that = this;

    for(let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].id = i+1;
    }

    // Load comments from localStorage
    this.loadComments();

    setInterval(function(){
      var start = new Date("2020-10-03T17:00:00");
      var mid   = new Date();
      var end   = new Date("2020-10-03T18:00:00");

      var total  = end.getTime() - start.getTime();
      var offset = mid.getTime() - start.getTime();

      var percentage = offset / total;

      if(percentage >= 1) percentage = 1;

      that.changeExplorer (percentage * 100);
      //that.changeExplorer (that.percentExplorer + 10);
     }, 1000);
  }

  changeExplorer (percent) {
    this.percentExplorer = percent;
    this.percentExplorerCss = "calc(" + this.percentExplorer + "% - 18px)";
  }

  public checkCardTigre() {
      var min = new Date("2020-10-03T17:10:00");
      var now   = new Date();
      var max   = new Date("2020-10-03T17:15:00");

      if((min.getTime() <= now.getTime()) && (now.getTime() <= max.getTime())) return true;
      else return false;
  }

  public checkCardEvent2() {
    var min = new Date("2020-10-03T17:250:00");
    var now   = new Date();
    var max   = new Date("2020-10-03T17:30:00");

    if((min.getTime() <= now.getTime()) && (now.getTime() <= max.getTime())) return true;
    else return false;
}

  public selectGroupe() {
    console.log(this.groupe)

    if(this.groupe <= 6) {
      console.log("Terre des Canuts")
      this.terre = "canuts";
    }
    else if(this.groupe <= 12) {
      console.log("Terre des Gones")
      this.terre = "gones";
    }
    else if(this.groupe <= 19) {
      console.log("Terre des Lumieres")
      this.terre = "lumieres";
    }
  }

  public updateComment(element: PeriodicElement, comment: string): void {
    element.comment = comment;
    this.saveComments();
  }

  private saveComments(): void {
    const comments = {};
    this.dataSource.forEach(element => {
      if (element.comment) {
        comments[element.id] = element.comment;
      }
    });
    localStorage.setItem('rallyePhotoComments', JSON.stringify(comments));
  }

  private loadComments(): void {
    const savedComments = localStorage.getItem('rallyePhotoComments');
    if (savedComments) {
      const comments = JSON.parse(savedComments);
      this.dataSource.forEach(element => {
        if (comments[element.id]) {
          element.comment = comments[element.id];
        }
      });
    }
  }

}




