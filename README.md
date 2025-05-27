# 🧩  Journal Trading Project  🧩

### *Context: Daily I make trading, so I wanted to create a interactive chart where I can see my results month by month.*

### ⬇️ INSTRUCTIONS ⬇️

### 🟨 INPUTS
#### There is two inputs, the first contain the quantity of the operation (the capital, when you lose or when you win).
####   ➡ The fisrt value, you put into this input, will be the `Initial Capital Value`.
####   ➡ From the second value, it will be subtracted or added according to the `Initial Capital Value`.
####   ➡ If the value(s) after the `Initial Capital Value` is positive, it will be added, otherweise, if the value is negative, it will be subtracted.
#### The second input, is the "Date input", here you have to put the date with this format --> "DD/MM/YYYY".
####   ➡ If you save a date, you just can save the same date or dates after. Dates before will be ignored and won't appear in the chart or be saved to Local Storage.

### 🟨 BUTTONS
#### "INGRESAR" --> This button will be save the data in the LocalStorage and show it in the Chart.
####   ➡ It will be work, just if there is information in the two inputs (1. Capital, 2. Date), and if the data is in the correct format.
#### "ELIMINAR ANTERIOR" ➡ It will be delete the `last object` hosted in the Local Storage, and the Chart will also be updated.
#### "BORRAR HISTORIAL" ➡ It will be clear all the Local Storage and the Chart will be start again.

### 🟨 HISTORY TABLE 
#### When you put information in the Chart, it will be appear too in the bottom from the page, in the following structure...
####                                                              (date: DD/MM/YYY............(Value putted in the input)  
####                                                              |  20/04/2000.................................... $10  |
####                                                              |  21/04/2000.................................... $12  |
####                                                              |  22/04/2000.................................... $-5  |
#### It will be also delete, when you press "ELIMINAR" or "BORRAR HISTORIAL", dynamically.

### 🟨 CHART
#### In the chart the data will be appear or disappear dynamically.
#### Y AXIS ➡ Here apper a range of numbers according the first capital you put.
#### X AXIS ➡ (Deleted)
#### The line in the chart will be red, when the entered value you reduce the `Inital Capital Value` bellow 0. Otherwise, the line will be "green" when this
#### value increase `Initial Capital Value` above 0.
