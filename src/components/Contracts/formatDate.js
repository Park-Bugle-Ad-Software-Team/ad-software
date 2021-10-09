export default function formatDate(date) {
    let d = new Date(date);
    return d.toLocaleDateString();
}