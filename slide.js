var functions = {
    slideIndex : 1,
    selecteddata : [],
    indexArr : [],
    slideCount : 10,
    displaySlideData : [],
    fetchList : () => {
        fetch('https://picsum.photos/list')
        .then(response => {
            if(response.ok) {
                functions.handleError('',false);
                return response.json();
            } else {
                functions.handleError('not successful',true);			
            }
        })
        .then(data => {
            if(data){
                var records = functions.saveRecords(data);
                functions.setDisplaySlideData(records);
            } else {
                functions.handleError('no records are there',true);	
            }		
        },error => {
            functions.handleError(error,true);
        });	
    },
    setDisplaySlideData :(records) => {
        if(records && functions.slideCount) {
            var randomnum=0;
            for(var i=0;i<functions.slideCount;i++) {
                randomnum = functions.randomNumber();
                functions.displaySlideData.push(records[randomnum]);
            }
            if(functions.displaySlideData.length) {
                functions.createSlideElement(functions.createDotElement);			
            }		
        }	
    },
    saveRecords : (data) => {
        var records = {};
        if(data) {
            for(var i =0;i<data.length;i++) {
                functions.indexArr.push(data[i].id);
                records[data[i].id] = data[i];	
            }
        }		
        return records;
    },
    randomNumber :() => {
        var randnum = 0;
        if(functions.indexArr.length) {
            randnum = functions.indexArr[Math.floor(Math.random() * functions.indexArr.length)];
            if(functions.selecteddata.length && functions.selecteddata.includes(randnum)) {
                if(functions.selecteddata.length< functions.indexArr.length)
                functions.randomNumber();
                return;	
            } else {
                functions.selecteddata.push(randnum);
            }
        }	
        return randnum; 
    },
    handleError : (msg,flag) =>{
        document.getElementById('errormsg').innerHTML = msg;
        document.getElementById('errormsg').style.display = "none";
        if(flag) {		
            document.getElementById('errormsg').style.display = "block";
        }
    },
    createSlideElement : (callback)=> {
        if(functions.displaySlideData.length) {
            for(var i=0;i<functions.displaySlideData.length;i++) {
                var newNode = document.createElement('div');
                newNode.setAttribute("class", "mySlides fade");
                var child1 = document.createElement('div');
                child1.setAttribute("class", "numbertext");
                child1.innerHTML = (i+1)+'/'+ functions.displaySlideData.length;
                var child2 = document.createElement("IMG");
                child2.
                setAttribute("src", "https://picsum.photos/200/300?image="+functions.displaySlideData[i].id);
                child2.setAttribute("style", "width:200;height:300");
                var child3 = document.createElement('div');
                child3.setAttribute("class", "text");
                child3.innerHTML = functions.displaySlideData[i].author;
                newNode.appendChild(child1);
                newNode.appendChild(child2);
                newNode.appendChild(child3);
                document.getElementById('slidecontainer').appendChild(newNode);
            }		
            setInterval(functions.nextSlide,2000);
            callback();
        } else {
            functions.handleError('error occured while creating display',true);
        }	
    },
    createDotElement : () =>{
        if(functions.displaySlideData.length) {
            var spanEle ='';
            for(var i=0;i<functions.displaySlideData.length;i++) {
                var j = i+1;
                spanEle+='<span class="dot" onclick="functions.currentSlide('+ j +')"></span>'; 
            }
            document.getElementById('dotdiv').innerHTML = spanEle;
        } else {
            functions.handleError('error occured while creating display',true);
        }	
    },
    nextSlide : () => {	
        functions.showSlides(functions.slideIndex);
        functions.updateSlideIndex();
    },
    updateSlideIndex :() => {
        functions.slideIndex = (functions.slideIndex+1)%functions.slideCount;
        return functions.slideIndex;
    },
    showSlides: (n) => {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {functions.slideIndex = 1}    
        if (n < 1) {functions.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[functions.slideIndex-1].style.display = "block";  
        dots[functions.slideIndex-1].className += " active";
    },
    currentSlide : (n) => {
        functions.showSlides(functions.slideIndex = n);
    }
};

//during run- npm test, uncomment following line
//module.exports = functions;