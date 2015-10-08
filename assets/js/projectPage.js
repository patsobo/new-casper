$(document).ready(function() {
    var html = document.getElementById("projectData");
    var text = html.innerText || html.textContent;

    var projectData = text.split('\n');

    // Initialize data objects
    var data = {projects:[]};
    var dataPoint = {};

    // Run through the data and store it properly into the data object
    // It's projectData.length - 1 because there seems to be an implicit newline at end.
    for(var i = 0; i < projectData.length - 1; i++) {
        if(projectData[i] == '') {
            data["projects"].push(dataPoint);
            dataPoint = {};
        }
        else {
            var splitLine = projectData[i].split(': ');
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
    }

    var uselessData = document.getElementById("projectData");
    uselessData.parentNode.removeChild(uselessData);

    // Load the html template into the actual page, in the projectList section
    $(".projectList").load("/project-template.html", function() {
        var templateScript = $(".projectList").html();
        $(".projectList").html("");   // Clear the template after it's been loaded
        var template = Handlebars.compile(templateScript);
        $(".projectList").append(template(data)); 
    });

});