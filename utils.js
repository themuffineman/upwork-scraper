export async function getRootDomain(url){
  try {
    await fetch(url,{
      method: 'GET',
      redirect: 'follow'
    })
    const finalUrl = response.url;
    return finalUrl;
  } catch (error) {
    
  }
}

getRootdomain('https://www.yelp.com/biz_redir?url=https%3A%2F%2Fdoubleeroofingaz.com&cachebuster=1720367795&website_link_type=website&src_bizid=f-_Z0eARPk-5d-F0OR4EWQ&s=21c037a14c912ad761b024e62b7f3e6f9b8ef45e017cb88d4f291b7fd6e1adc5').then((result)=>{
  console,log(result)
})

