const pool = require('./pool');

const setPost = async function(mainText,title,url,menu){
  try {
    mainText = mainText.replace(/\"/gi,"'");
    pool.query(`insert into post(id,mainText,title,url,menu,created_at,updated_at) values (null,"${mainText}",'${title}','${url}','${menu}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`);
    return true;
  } catch (error) {
    return false; 
  }
}

const getPost = async function(postId){
  try {
    const [rows,fields] = await pool.query(`select * from post where id = ${postId}`);
    if(rows.length === 0){return false;}
    return rows[0];
  } catch (error) {
    return false; 
  }
}

module.exports ={setPost,getPost}