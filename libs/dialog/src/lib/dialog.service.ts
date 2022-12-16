import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class DTDialogService {
  constructor(private dialog: MatDialog) {}

  async openDialog(
    dialogName: string,
    data: any = undefined
  ): Promise<MatDialogRef<any>> {
    const chunc = await import(`./${dialogName}/${dialogName}.component`);
    const dialogComponent = Object.values(chunc)[0] as ComponentType<unknown>;
    if (data) return this.dialog.open(dialogComponent, data);
    else return this.dialog.open(dialogComponent);
  }
}
