import  argon2  from "argon2";


// let password = "1234567";
// let hash_password =  await argon2.hash(password)
// let hash2 = await argon2.hash(password)
// // console.log(hash_password, hash2)


// let ans = await argon2.verify(hash_password,password)

// console.log(ans)

export async function hash_password(password){
    const hash_password = await argon2.hash(password)
    return hash_password
}

export async function verify_password(hash_password,password){
    const result = await argon2.verify(hash_password,password)
    return result
}