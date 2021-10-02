const parseCSV = function(csv: str): str[][]{
    let lines: str[] = csv.split('\n');
    let line: str;
    let data: str[][] = [];
    for(line of lines){
        let items = line.split(',');
        data.push(items);
    }
    return data;
}
const avg = function(...nums: int[]): int{
    let res = nums.reduce((prev, acc)=>prev+acc);
    res /= nums.length;
    return res;
}
export {parseCSV, avg};