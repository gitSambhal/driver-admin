import {Injectable} from '@angular/core';


@Injectable()
export class SharedService {
  copy(el) {
    /* Get the text field */
    var copyText: any = el

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");
  }

}