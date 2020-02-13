button.addEventListener('click', send, false)
  const send = async() => {
    const phoneNumber = req.body.phone
    const numberInput = phoneNumber.value.replace(/\D/g, '')
    const Message = req.body.message
    const textMessage = Message.value

    fetch('/', {
      method: 'post',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({numberInput:numberInput, textMessage:textMessage})
    })

    .then(function(res){
        console.log(res)
    })
    .catch(function(err){
        console.log(err)
    })
  }