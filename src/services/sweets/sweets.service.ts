import { Subject } from 'rxjs';

export class SweetsService {
  static selectedSweetIds: string[] = [];
  static selectedProductId: number;
  static amountOfSweetsToBeSelected: number;
  static selectedProductPrice: number;
  static onChange: Subject<any> = new Subject();

  static updateSelectedSweets(selectedSweetId: string, type: string) {
    if (type === 'increment') {
      if (this.selectedSweetIds.length - 1 === this.amountOfSweetsToBeSelected) {
        return;
      }

      this.selectedSweetIds.push(selectedSweetId);
    } else {
      const index = this.selectedSweetIds.indexOf(selectedSweetId);
      this.selectedSweetIds.splice(index, 1);
    }

    this.onChange.next({
      type: 'sweetSelected',
      value: this.selectedSweetIds.length
    });

    this.onChange.next({
      type: 'checkValidity',
      value: this.selectedSweetIds.length >= this.amountOfSweetsToBeSelected && this.selectedProductId !== undefined
    });
  }

  static updateSelectedProductId(selectedProductId) {
    this.selectedProductId = selectedProductId;

    this.onChange.next({
      type: 'checkValidity',
      value: this.selectedSweetIds.length >= this.amountOfSweetsToBeSelected && this.selectedProductId !== undefined
    });
  }

  static updateSelectedProductPrice(selectedProductPrice) {
    this.selectedProductPrice = selectedProductPrice;
  }

  static updateAmountOfSweetsToBeSelected(amountOfSweetsToBeSelected) {
    this.amountOfSweetsToBeSelected = amountOfSweetsToBeSelected;

    this.onChange.next({
      type: 'amountOfSweetsUpdate',
      value: this.amountOfSweetsToBeSelected
    });

    this.onChange.next({
      type: 'checkValidity',
      value: this.selectedSweetIds.length >= this.amountOfSweetsToBeSelected && this.selectedProductId !== undefined
    });
  }
}
