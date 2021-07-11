export function authorName(author) {
  if (author.first_name || author.last_name) {
    return `${author.first_name} ${author.last_name}`;
  } else {
    return author.username;
  }
}
