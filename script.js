// =========================================
// Geological Club Dashboard
// =========================================

const workshops=[

/* ======================
Semester 1
====================== */

{
name:"Research",
full:"Research Databases",
semester:"Semester 1",
participants:29,
rating:4.72
},

{
name:"Ref Theory",
full:"Referencing & Citation (Theory)",
semester:"Semester 1",
participants:20,
rating:4.75
},

{
name:"Ref Practical",
full:"Referencing & Citation (Practical)",
semester:"Semester 1",
participants:24,
rating:4.67
},

{
name:"Paper Reading",
full:"How to Read a Scientific Paper",
semester:"Semester 1",
participants:35,
rating:4.80
},

{
name:"Writing",
full:"Scientific Writing",
semester:"Semester 1",
participants:54,
rating:4.74
},

{
name:"Abstract",
full:"Writing an Abstract",
semester:"Semester 1",
participants:30,
rating:4.69
},

{
name:"Excel 1",
full:"Excel Basics (Day 1)",
semester:"Semester 1",
participants:10,
rating:4.81
},

{
name:"Excel 2",
full:"Excel Basics (Day 2)",
semester:"Semester 1",
participants:11,
rating:4.78
},

{
name:"Presentation",
full:"Scientific Presentations",
semester:"Semester 1",
participants:29,
rating:4.76
},

{
name:"AI",
full:"AI in Scientific Research",
semester:"Semester 1",
participants:20,
rating:4.84
},

/* ======================
Semester 2
====================== */

{
name:"Research",
full:"Research Databases",
semester:"Semester 2",
participants:48,
rating:4.72
},

{
name:"Ref Theory",
full:"Referencing & Citation (Theory)",
semester:"Semester 2",
participants:51,
rating:4.75
},

{
name:"Ref Practical",
full:"Referencing & Citation (Practical)",
semester:"Semester 2",
participants:31,
rating:4.67
},

{
name:"Paper Reading",
full:"How to Read a Scientific Paper",
semester:"Semester 2",
participants:49,
rating:4.80
},

{
name:"Writing",
full:"Scientific Writing",
semester:"Semester 2",
participants:31,
rating:4.74
},

{
name:"Excel 1",
full:"Excel Basics (Day 1)",
semester:"Semester 2",
participants:49,
rating:4.81
},

{
name:"Excel 2",
full:"Excel Basics (Day 2)",
semester:"Semester 2",
participants:40,
rating:4.78
},

{
name:"Presentation",
full:"Scientific Presentations",
semester:"Semester 2",
participants:32,
rating:4.76
},

{
name:"Project Presentation",
full:"Project Presentation Skills",
semester:"Semester 2",
participants:80,
rating:4.82
},

{
name:"ArcGIS Pro",
full:"Extracting & Analyzing Spatial Maps and Satellite Images using ArcGIS Pro",
semester:"Semester 2",
participants:64,
rating:4.47
},

{
name:"AI",
full:"AI in Scientific Research",
semester:"Semester 2",
participants:68,
rating:4.84
}

];

let chart=null;

const OFFICIAL={

semester1:262,

semester2:540,

all:802

};
// =========================================
// Helpers
// =========================================

function participantsTotal(data){

    if(data.every(x=>x.semester==="Semester 1")){

        return OFFICIAL.semester1;

    }

    if(data.every(x=>x.semester==="Semester 2")){

        return OFFICIAL.semester2;

    }

    return OFFICIAL.all;

}

function averageRating(data){

    return (

        data.reduce(

            (sum,item)=>sum+item.rating,

            0

        )

        /

        data.length

    );

}

function bestWorkshop(data){

    return data.reduce(

        (a,b)=>

        a.rating>b.rating

        ?a

        :b

    );

}

// =========================================
// Counter Animation
// =========================================

function animateNumber(id,target,decimals=0){

    const el=document.getElementById(id);

    let current=0;

    const speed=target/45;

    const timer=setInterval(()=>{

        current+=speed;

        if(current>=target){

            current=target;

            clearInterval(timer);

        }

        el.innerHTML=current.toFixed(decimals);

    },18);

}

// =========================================
// Update Cards
// =========================================

function updateCards(data){

    animateNumber(

        "totalWorkshops",

        data.length

    );

    animateNumber(

        "totalParticipants",

        participantsTotal(data)

    );

    animateNumber(

        "overallAverage",

        averageRating(data),

        2

    );

    document.getElementById(

        "bestWorkshop"

    ).innerHTML=

    bestWorkshop(data).full;

}
// =========================================
// Chart
// =========================================

function renderChart(data){

    const options={

        chart:{

            type:"bar",

            height:420,

            toolbar:{

                show:false

            },

            animations:{

                enabled:true,

                easing:"easeinout",

                speed:900

            }

        },

        series:[{

            name:"Workshop Satisfaction",

            data:data.map(item=>item.rating)

        }],

        plotOptions:{

            bar:{

                borderRadius:12,

                columnWidth:"55%",

                distributed:true,

                dataLabels:{

                    position:"top"

                }

            }

        },

        colors:data.map(item=>{

            if(item.rating>=4.80) return "#22c55e";

            if(item.rating>=4.70) return "#2563eb";

            return "#60a5fa";

        }),

        dataLabels:{

            enabled:true,

            offsetY:-18,

            formatter:function(value,opts){

                return "⭐ "+value.toFixed(2);

            },

            style:{

                fontSize:"11px",

                fontWeight:"600",

                colors:["#16355D"]

            }

        },

        legend:{

            show:false

        },

        xaxis:{

            categories:data.map(item=>item.name),

            labels:{

                rotate:0,

                style:{

                    fontSize:"12px"

                }

            }

        },

        yaxis:{

            min:4,

            max:5,

            tickAmount:5,

            title:{

                text:"Average Rating"

            }

        },

        tooltip:{

            custom:function({series,seriesIndex,dataPointIndex}){

                const w=data[dataPointIndex];

                return `

                <div style="padding:12px">

                <b>${w.full}</b>

                <br><br>

                ⭐ Rating : ${w.rating}

                <br>

                👥 Participants : ${w.participants}

                <br>

                📚 ${w.semester}

                </div>

                `;

            }

        },

        grid:{

            borderColor:"#dbeafe"

        }

    };

    if(chart){

        chart.destroy();

    }

    chart=new ApexCharts(

        document.querySelector("#chart"),

        options

    );

    chart.render();

}
// =========================================
// Table
// =========================================

function renderTable(data){

    const tbody=document.getElementById("tableBody");

    tbody.innerHTML="";

    const sorted=[...data].sort(

        (a,b)=>b.rating-a.rating

    );

    sorted.forEach(item=>{

        tbody.innerHTML+=`

        <tr>

            <td>${item.full}</td>

            <td>${item.semester}</td>

            <td>${item.participants}</td>

            <td>⭐ ${item.rating.toFixed(2)}</td>

        </tr>

        `;

    });

}

// =========================================
// Dashboard
// =========================================

function renderDashboard(data){

    updateCards(data);

    renderChart(data);

    renderTable(data);

}

// =========================================
// Semester Filters
// =========================================

document.getElementById("allBtn").onclick=()=>{

    renderDashboard(workshops);

};

document.getElementById("s1Btn").onclick=()=>{

    renderDashboard(

        workshops.filter(

            x=>x.semester==="Semester 1"

        )

    );

};

document.getElementById("s2Btn").onclick=()=>{

    renderDashboard(

        workshops.filter(

            x=>x.semester==="Semester 2"

        )

    );

};
// =========================================
// Active Button
// =========================================

const buttons=document.querySelectorAll(".navButtons button");

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(btn=>{

            btn.classList.remove("active");

        });

        button.classList.add("active");

    });

});

// =========================================
// Page Animation
// =========================================

window.addEventListener("load",()=>{

    document.body.style.opacity="0";

    document.body.animate(

        [

            {

                opacity:0,

                transform:"translateY(15px)"

            },

            {

                opacity:1,

                transform:"translateY(0)"

            }

        ],

        {

            duration:700,

            fill:"forwards"

        }

    );

});

// =========================================
// Download Chart
// =========================================

function downloadChart(){

    if(!chart) return;

    chart.dataURI().then(({imgURI})=>{

        const a=document.createElement("a");

        a.href=imgURI;

        a.download="WorkshopDashboard.png";

        a.click();

    });

}

// =========================================
// Initial Load
// =========================================

renderDashboard(workshops);

buttons[0].classList.add("active");

// =========================================

console.clear();

console.log(

"%c🪨 Geological Club Dashboard Ready",

"font-size:18px;color:#2563eb;font-weight:bold;"

);
