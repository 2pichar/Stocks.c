const parse = function(csv: str): str[][]{
    let lines: str[] = csv.split('\n');
    let line: str;
    let data: str[][] = [];
    for(line of lines){
        let items = line.split(',');
        data.push(items);
    }
    return data;
}
export {parse};