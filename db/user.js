const pool = require('./pool');

const getUserInfo = async function(user_id){
  try {
    const [rows,fields] = await pool.query(`select * from user where id = '${user_id}'`);
    if(rows.length === 0){return false;}

    return rows[0];
  } catch (error) {
    return false; 
  }
}

const isExistSnsId = async(sns_id) => {
  try {
    const [rows,fields] = await pool.query(`select user_id from social_logins where sns_id = '${sns_id}'`);
    if(rows.length === 0){return false;}
    return rows[0].user_id;
  } catch (error) {
    return false; 
  }
}

const snsSignUp = async({email,nickname, sns_id,picture,type }) => {
  try{
    if(!nickname){
      nickname = email.split("@")[0];
    }
    if(email&&nickname){
      const userQuery = `insert into user(id,name,picture,email,user_type) values(null,'${nickname}','${picture}','${email}','${type}')`;
      pool.query(userQuery,(err,result,fileds)=>{
        if(err) throw err;
        const snsUserQuery = `insert into social_logins(id,type,sns_id,created_at,updated_at,user_id) values (null,'${type}','${sns_id}',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,${result.insertId})`;
        pool.query(snsUserQuery,(err,res,fileds)=>{
          if(err) throw err;
          return result.insertId;
        });
      });
      return false;
    }
  }catch(error){
    console.log(error);
    return false;
  }
}
module.exports ={getUserInfo,snsSignUp, isExistSnsId}