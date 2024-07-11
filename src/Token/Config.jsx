const token=localStorage.getItem('token')
const adminToken=localStorage.getItem('admintoken')

export const userConfig={

    headers:{
        'Content-Type':'application/json',
        Authorization:token
    }
}
export const adminConfig={
    headers:{
        'Content-Type':"application/json",
        Authorization:adminToken,
    }
}