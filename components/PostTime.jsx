export default function PostTime({ creation }) {

    const date = new Date(Date.parse(creation));
    const fDate = `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`;

    return (<span className={`h-fit`} > {fDate} </span>)
}