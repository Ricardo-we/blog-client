export default function orderTableByLowerToBiggerIds(rows){
    for(let i in rows){
        for(let j = 1; j < rows.length; j++){
            if(rows[j-1].id > rows[j].id){
                const temp = rows[j-1];
                rows[j-1] = rows[j];
                rows[j] = temp;
            }
        }
    }
    return rows
}

export  function orderTableByBiggerToLowerIds(rows){
    for(let i in rows){
        for(let j = 1; j < rows.length; j++){
            if(rows[j-1].id < rows[j].id){
                const temp = rows[j-1];
                rows[j-1] = rows[j];
                rows[j] = temp;
            }
        }
    }
    return rows
}

export function orderTableByDate(rows){
    for(let i in rows){
        for(let j = 1; j < rows.length; j++){
            const date1 = dateToDayOfYear(rows[j-1].last_update);
            const date2 = dateToDayOfYear(rows[j].last_update);

            if(date1 > date2){
                const temp = rows[j-1];
                rows[j-1] = rows[j];
                rows[j] = temp;
            }
        }
    }
    console.log(rows)
    return rows;
}

function dateToDayOfYear(date){
    date = date.split('-');
    const dateYear = date[0]
    const dateMonth = date[1];
    const dateDay = date[2];
    return Math.floor((dateYear * 365) + (30.41 * dateMonth) - (30.41 - dateDay))
}