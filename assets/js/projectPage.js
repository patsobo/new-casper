$(document).ready(function() {
    console.log("Reading projectpage...");

    var html = document.getElementById("projectData");
    var text = html.innerText || html.textContent;

    var projectData = text.split('\n');

    // Initialize data objects
    var data = {projects:[]};
    var dataPoint = {};


    console.log("Project Data incoming...");
    console.log("projectData length: " + text);

    // Run through the data and store it properly into the data object
    // It's projectData.length - 1 because there seems to be an implicit newline at end.
    for(var i = 0; i < projectData.length - 1; i++) {
        projectData[i] = projectData[i].replace(/(\r\n|\n|\r)/gm,"");
        //projectData[i] = projectData[i].replace(/\s+/g," ");
        console.log("projectData " + i + ":" + projectData[i] + "!!");
        if(projectData[i] == '') {
            console.log("dataPoint");
            data["projects"].push(dataPoint);
            dataPoint = {};
        }
        else {
            var splitLine = projectData[i].split(': ');
            splitLine[0] = splitLine[0].replace(/\s+/g,''); 
            splitLine[0] = splitLine[0].replace(/(\r\n|\n|\r)/gm,"");                  
            console.log("splitLine:" + splitLine[0] + "!!");
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

    console.log("loop complete...");

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