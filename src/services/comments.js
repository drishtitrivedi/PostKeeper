const replys = [
  {
    id: 1,
    post_id: 1,
    reply_name: "gail",
    reply_email: "gail@gmail.com",
    reply_body: "Beautiful Blog.",
  },
  {
    id: 2,
    post_id: 2,
    reply_name: "jai",
    reply_email: "jai@gmail.com",
    reply_body: "Inspiring Blog.",
  },
];

export function getReply() {
  return replys;
}

export function getreply(post_id) {
  return replys.find((p) => p.post_id === post_id);
}

export function saveReply(reply) {
  let replyInDb = replys.find((p) => p.id === reply.id) || {};
  replyInDb.post_id = reply.post_id;
  replyInDb.reply_name = reply.reply_name;
  replyInDb.reply_email = reply.reply_email;
  replyInDb.reply_body = reply.reply_body;

  if (!replyInDb.id) {
    replyInDb.id = replys.length + 1;
    replys.push(replyInDb);
  }
  console.log(replys);
  return replys;
}

export function deleteReply(reply) {
  let replyToDelete = replys.find((p) => p.id === reply.id);
  replys.splice(replys.indexOf(replyToDelete), 1);
  return replyToDelete;
}
