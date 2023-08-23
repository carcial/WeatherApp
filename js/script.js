
const inputTag = document.getElementById("inputTag")
const showData = document.getElementById("showData")

let API_key = "d8c32e90c0bb8d0aec9710f2f2405757"

const sendCity = document.getElementById("sendCity")

if(inputTag.value ===""){

	const url ="https://api.openweathermap.org/data/2.5/weather?q=ilmenau&units=metric&appid="+API_key
	takeInfos(url)

}


sendCity.addEventListener("click", () =>{

	const url ="https://api.openweathermap.org/data/2.5/weather?q="+inputTag.value+"&units=metric&appid="+API_key

	console.log(inputTag.value)
	takeInfos(url)
})

async function takeInfos(url2){

	const currenDate = new Date()
	const onlyDate = currenDate.getDate()
	                 +"."+
	                 (currenDate.getMonth()+1)
	                 +"."+
	                 currenDate.getFullYear()
	const onlyTime = currenDate.getHours()
	             +":"+
	             currenDate.getMinutes()   
	console.log(onlyDate)
	console.log(onlyTime)                           

	try{
		const response =  await fetch(url2)
		const data = await response.json()

		const iconId = data.weather[0].icon
		const iconLink = "http://openweathermap.org/img/w/"+iconId+".png"

		console.log(data)
		console.log(data.name,data.main.temp)

		showData.innerHTML = `<div class="cityData">
		                        <div class="part1">
		                            <img src=${iconLink}>
		                            <h2>${data.name}</h2><br>
		                            <h4>${data.weather[0].main}</h4><br>
		                            
		                        </div>
		                        <h3>${data.main.temp}&degC</h3>
                                <div class="centerPart">
                                   <div class="subCenterPart">
                                   <i class="fa fa-calendar" 
                                   aria-hidden="true"></i>
                                   <h5>${onlyDate}</h5>
                                   </div>
                                   <div class="subCenterPart">
                                   <i class="fa fa-clock-o" 
                                   aria-hidden="true"></i>
                                   <h5>${onlyTime}</h5>
                                   </div>
                                </div>
		                        <div class="part2">
                                    <div class="subPart2">
                                       <i class="fa-solid 
                                       fa-temperature-three-quarters"></i>
                                       <h5>High/Low</h5>
                                       <h6>
                                       ${data.main.temp_max}
                                       /
                                       ${data.main.temp_min}
                                       </h6>
                                    </div>
                                    <div class="subPart2">
                                       <i class="fa-solid fa-wind"></i>
                                       <h5>Wind</h5>
                                       <h6>${data.wind.speed} mph</h6>
                                    </div>
                                    <div class="subPart2">
                                       <i class="fa fa-tint" aria-hidden="true"></i>
                                       <h5>Humidity</h5>
                                       <h6>${data.main.humidity} %</h6>
                                    </div>
                                    <div class="subPart2">
                                       <i class="fa-sharp fa-solid fa-eye"></i>
                                       <h5>Visibility</h5>
                                       <h6>${data.visibility} km</h6>
                                    </div>
		                        </div>
		                        
		                      </div>`

		inputTag.value = ""                   
	}
	catch(error){
		console.log(error)
	}
}


