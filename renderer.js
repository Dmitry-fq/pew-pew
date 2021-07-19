let renderer = {
    table: document.getElementById('game'),

    renderField(rowsCount, colsCount) {
        this.table.innerText = '';

        for (let row = 0; row < rowsCount; row++) {
            let tr = document.createElement('tr');
            tr.classList.add('row');
            this.table.appendChild(tr);
            for (let col = 0; col < colsCount; col++) {
                let td = document.createElement('td');
                td.classList.add('cell');
                tr.appendChild(td);
                td.setAttribute('id', `x${col}_y${row}`);
            }
        }
    },
};
