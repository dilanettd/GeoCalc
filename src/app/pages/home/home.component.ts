import { Component, OnInit } from '@angular/core';
import { FiguresService } from '../../shared/services/figures.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /** The current selected figure. */
  public currentFigure: any;

  /** The unit used for perimeter calculations. */
  public currentUnitPerimeter: string = 'm';

  /** The unit used for area calculations. */
  public currentUnitArea: string = 'm²';

  /** The type of calculation selected (Perimeter or Area). */
  public typeOfCalculation: string = 'Perimeter';

  /** The result of the calculation. */
  public result: number = 0;

  /** The list of available units. */
  public perimeterUnitsList: string[] = [];

  /** The list of available units. */
  public AreaUnitsList: string[] = [];

  /** The list of available figures. */
  public figuresList: any[] = [];

  /** Tells if there's an error in the form. */
  public isError: boolean = false;

  /**
   * The model used for two-way data binding with the form inputs.
   * It's a dictionary where keys are strings and values are numbers.
   */
  myModel: { [key: string]: number } = {};

  /** The base URL of the API. */
  public baseurl = environment.API_URL;

  constructor(private figuresService: FiguresService) {}

  /**
   * Initializes the component by fetching units and figures from the service.
   */
  ngOnInit(): void {
    this.figuresService.getUnits().subscribe({
      next: (unitsList: any) => {
        this.perimeterUnitsList = unitsList.units.perimeter;
        this.AreaUnitsList = unitsList.units.area;
      },
    });
    this.figuresService.getAllFigures().subscribe({
      next: (figuresList: any) => {
        this.figuresList = figuresList.figures;
        this.currentFigure = figuresList.figures[0];
      },
    });
  }

  /**
   * Handler for when a figure is selected from the dropdown.
   * @param event The event object.
   */
  selectedFigure(event: Event): void {
    this.currentFigure = this.figuresList.find(
      (figure) => figure.id === (event.target as HTMLTextAreaElement).value
    );
    this.myModel = {};
    this.result = 0;
  }

  /**
   * Handler for when a calculation type (Perimeter or Area) is selected.
   * @param event The event object.
   */
  selectedType(event: Event): void {
    this.typeOfCalculation = (event.target as HTMLTextAreaElement).value;
    this.result = 0;
  }

  /**
   * Handler for when the unit used for perimeter is changed.
   * @param event The event object.
   */
  changePerimeterUnit(event: Event): void {
    this.result = this.convertPerimeter(
      this.currentUnitPerimeter,
      this.result,
      (event.target as HTMLTextAreaElement).value
    );
    this.currentUnitPerimeter = (event.target as HTMLTextAreaElement).value;
  }

  /**
   * Handler for when the unit used for area is changed.
   * @param event The event object.
   */
  changeAreaUnit(event: Event): void {
    this.result = this.convertArea(
      this.currentUnitArea,
      this.result,
      (event.target as HTMLTextAreaElement).value
    );
    this.currentUnitArea = (event.target as HTMLTextAreaElement).value;
  }

  /**
   * Converts a perimeter value from its current unit to a new unit.
   * @param startUnit The current unit of the value.
   * @param value The value to convert.
   * @param outputUnit The unit to convert the value to.
   * @returns The converted perimeter value.
   */
  convertPerimeter(
    startUnit: string,
    value: number,
    outputUnit: string
  ): number {
    let result: number;
    switch (startUnit) {
      case 'cm':
        result = value / 100;
        break;
      case 'dm':
        result = value / 10;
        break;
      case 'm':
        result = value;
        break;
      case 'km':
        result = value * 1000;
        break;
      default:
        return NaN;
    }

    switch (outputUnit) {
      case 'cm':
        result *= 100;
        break;
      case 'dm':
        result *= 10;
        break;
      case 'km':
        result /= 1000;
        break;
    }

    return Number(result.toFixed(12));
  }

  /**
   * Converts an area value from its current unit to a new unit.
   * @param startUnit The current unit of the value.
   * @param value The value to convert.
   * @param outputUnit The unit to convert the value to.
   * @returns The converted area value.
   */
  convertArea(startUnit: string, value: number, outputUnit: string): number {
    let result: number;
    switch (startUnit) {
      case 'cm²':
        result = value / 10000;
        break;
      case 'm²':
        result = value;
        break;
      case 'dm²':
        result = value / 100;
        break;
      case 'km²':
        result = value * 1000000;
        break;
      default:
        return NaN;
    }

    switch (outputUnit) {
      case 'cm²':
        result *= 10000;
        break;
      case 'dm²':
        result *= 100;
        break;
      case 'km²':
        result /= 1000000;
        break;
    }
    return Number(result.toFixed(12));
  }

  /**
   * Perform calculation based on type of calculation selected.
   * @param startUnit The current unit of the value.
   * @param value The value to convert.
   * @param outputUnit The unit to convert the value to.
   * @returns The converted area value.
   */
  calculate(): void {
    this.isError = false;
    this.result = 0;
    const valuesArray = Object.values(this.myModel);
    if (this.isAllPositive(valuesArray)) {
      if (this.typeOfCalculation === 'Perimeter') {
        this.figuresService
          .calculatePerimeter({
            id: this.currentFigure.id,
            values: valuesArray,
          })
          .subscribe({
            next: (reslutat: any) => {
              if (reslutat.perimeter % 1 !== 0) {
                this.result = Math.round(reslutat.perimeter * 100) / 100;
              } else {
                this.result = reslutat.perimeter;
              }
            },
          });
      }
      if (this.typeOfCalculation === 'Area') {
        this.figuresService
          .calculateArea({ id: this.currentFigure.id, values: valuesArray })
          .subscribe({
            next: (reslutat: any) => {
              if (reslutat.area % 1 !== 0) {
                this.result = Math.round(reslutat.area * 100) / 100;
              } else {
                this.result = reslutat.area;
              }
            },
          });
      }
    } else {
      this.isError = true;
    }
  }

  /**
   * Checks that the array contains no negative elements or is empty,
   * to avoid overloading the server with unnecessary requests.
   * @param nums The current unit of the value.
   * @returns The status of the verification, which can be true or false
   */
  isAllPositive(nums: number[]): boolean {
    if (nums.length === 0) {
      return false;
    }
    for (const num of nums) {
      if (num <= 0) {
        return false;
      }
    }
    return true;
  }
}
