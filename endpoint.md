            auth
/auth/login            post
/auth/change-password  post
/auth/refresh-token    post
/auth/forget-password  post
/auth/reset-password   post

          users
/users/create-merchant      post
/users/create-admin         post
/users/change-status/:id    post
/users/me                   get



	company info
company name, site url(web/facebook),city, zone.
	account Info
name, email,mobile,password,confirm password
	payment Detailse
bkash{
bkash type{agent, personal},bkash number
}, bank{select bank{brac, dbbl, other},bank account holder,bank account no.,brach name, routing no.}