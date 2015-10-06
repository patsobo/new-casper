$(function() {
    var data = {projects:[
        {
            name:"Pooper Scooper",
            description:"A fun pooper scooper object!",
            blogLink:"/tag/website-changes",
            githubLink:"https://github.com/psobolew-co/Simple-Phone-Game",
        },
        {
            name:"UFO ALIENS",
            description:"A fun UFO ALIENS object!",
            blogLink:"/tag/website-changes",
            githubLink:"https://github.com/psobolew-co/Simple-Phone-Game",
        },
    ]};

    $(".projectList").load("/project-template.html", function() {
        var templateScript = $(".projectList").html();
        $(".projectList").html("");   // Clear the template after it's been loaded
        var template = Handlebars.compile(templateScript);
        $(".projectList").append(template(data)); 
    });

});