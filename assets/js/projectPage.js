$(document).ready(function() {
    var html = document.getElementById("projectData");
    var text = html.innerText || html.textContent;

    var projectData = text.split('\n');
    //console.log("projectData:" + projectData);
    var data = {projects:[]};
    var dataPoint = {};
    for(var i = 0; i < projectData.length; i++) {
        if(projectData[i] == '') {
            data["projects"].push(dataPoint);
            console.log("dataPoint: " + dataPoint["github"]);
            dataPoint = {};
            console.log("data: " + i + data["projects"]);
            continue;
        }
        splitLine = projectData[i].split(': ');
        switch(splitLine[0]) {
            case "name":
                dataPoint["name"] = splitLine[1];
                break;
            case "description":
                dataPoint["description"] = splitLine[1];
                break;
            case "blog":
                dataPoint["blogLink"] = splitLine[1];
                break;
            case "github":
                dataPoint["githubLink"] = splitLine[1];
                break;
            case "download":
                dataPoint["downloadLink"] = splitLine[1];
                break;                                                
            default:
                break;
        }
    }

    $(".projectList").load("/project-template.html", function() {
        var templateScript = $(".projectList").html();
        $(".projectList").html("");   // Clear the template after it's been loaded
        var template = Handlebars.compile(templateScript);
        $(".projectList").append(template(data)); 
    });

});