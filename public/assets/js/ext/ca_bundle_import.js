window.onload = function () {
    document.getElementById("zip-bundle-error-btn").onclick = function () {
        document.querySelector(".zip-bundle-error-wrapper").classList.toggle("ng-hide");
    };
    document.getElementById("zip-bundle-dir-error-btn").onclick = function () {
        document.querySelector(".zip-bundle-dir-error-wrapper").classList.toggle("ng-hide");
    };
};
function inspectInput(ev) {
    var container = document.querySelector('.progress-panel');
    container.innerHTML = "";
    var namevalue = document.querySelector('.input-file-choose');
    namevalue.innerHTML = ev.target.value.split('\\').pop();
    var ub = document.querySelector('#upload_btn');
    ub.removeAttribute('disabled');
}

function uploadFile() {
    var file_form = document.querySelector('#filechoose');
    var src_file = file_form.files[0];
    if (src_file.name.split('.').pop().toLowerCase() !== 'zip') {
        var ub = document.querySelector('#upload_btn');
        ub.setAttribute('disabled', '');
        alert('Invalid file type...');
        return;
    }
    if (src_file === undefined) {
        return;
    }
    chunk_size = 10000000;
    chunk_num = Math.ceil(src_file.size / chunk_size);
    chunks = [];
    for (var i = 0; i < chunk_num; i++) {
        chunk = src_file.slice(chunk_size * i, chunk_size * (i + 1));
        chunks.push(chunk);
    }
    blobs = [];
    var chunks_length = chunks.length;
    for (var ii = 0; ii < chunks_length; ii++) {
        var data_ar = [];
        data_ar.push(chunks_length + '&d&');
        data_ar.push('part_' + ii);
        data_ar.push('&d&');
        data_ar.push(chunks[ii]);
        var nbl = new Blob(data_ar, {
            type: 'application/octet-stream'
        });
        blobs.push(nbl);
    }
    var blobs_length = blobs.length;
    for (var iii = 0; iii < blobs_length; iii++) {
        upload(blobs[iii], iii);
    }
}

function startChunk() {
    var xhr = new XMLHttpRequest();
    xhr.onload = xhr.onerror = function() {
        var fault = false;
        var state = {};
        if (this.status == 200) {
            if (this.response.length > 0) {
                state = JSON.parse(this.response);
            }
            if (state !== undefined && state !== null) {
                if (state.error !== undefined && state.error !== null) {
                    if (state.error) {
                        fault = true;
                    }
                }
            }
            if (fault !== true) {
                uploadFile();
            } else {
                document.querySelector(".zip-bundle-dir-error-wrapper").classList.toggle("ng-hide");
                console.log(state.error);
            }
        } else {
            console.log("error " + this.status);
        }
    };
    xhr.open("POST", "/bundle/startchunk", true);
    xhr.send();
    var ub = document.querySelector('#upload_btn');
    ub.setAttribute('disabled', '');
}

function upload(chunk, number) {
    createProgressBar(number);
    var xhr = new XMLHttpRequest();
    // обработчик для закачки
    xhr.upload.onprogress = function(e) {
        var progressBar = {};
        if (e.lengthComputable) {
            progressBar.value = (e.loaded / e.total) * 100;
            var meter_el = document.querySelector('#meter_' + number);
            meter_el.style.width = progressBar.value + '%';
            progressBar.textContent = progressBar.value;
        }
    };
    // обработчики успеха и ошибки
    // если status == 200, то это успех, иначе ошибка
    xhr.onload = xhr.onerror = function() {
        if (this.status == 200) {
            if (xhr.readyState === 4) {
                if (xhr.response.length > 0) {
                    var status = JSON.parse(xhr.response);
                    if (status.state === 'finish') {
                    }
                }
            }
        } else {
            console.log("error " + this.status);
        }
    };
    xhr.open("POST", "/bundle/upload", true);
    xhr.send(chunk);
}

function createProgressBar(number) {
    var container = document.querySelector('.progress-panel');
    var meter = document.createElement('div');
    meter.classList.add('progress-bar-meter');
    var span_meter = document.createElement('span');
    span_meter.id = 'meter_' + number;
    meter.appendChild(span_meter);
    container.appendChild(meter);
}

CaWS = new WebSocket('ws://fmt-api.com:8888');
CaWS.onmessage = function(ev) {
    ProcessingMsg(ev.data);
};

function ProcessingMsg(msg) {
    if (msg.substr(10,6) === 'bundle') {
        if (msg.substr(17,4) === 'info') {
            showInfo(msg);
        }
        if (msg.substr(17,4) === 'file') {
            showProgress(msg);
        }
        if (msg.substr(17, 5) === 'error') {
            document.querySelector(".zip-bundle-error-wrapper").classList.toggle("ng-hide");
            document.querySelector(".process-info-panel").innerHTML="";
            document.querySelector(".progress-info-panel").innerHTML="";
        }
    }

}
function showInfo(msg) {
    var info = msg.substr(22);
    var info_el = document.createElement('p');
    info_el.innerHTML = info.replace(/:/ig, ' ');
    document.querySelector(".process-info-panel").appendChild(info_el);
}

function showProgress(msg) {
    var msg_body = msg.substr(22);
    var msg_array = msg_body.split(':');
    var f_name = msg_array[0];
    var prgs = msg_array.pop();
    var exp = "[data-file='"+f_name+"']";
    var s_el = document.querySelector(exp);
    if (s_el !== null && s_el !== undefined) {
        s_el.querySelector(".file-process-progress").querySelector("span").style.width = prgs+ "%";
        s_el.querySelector(".prgsval").innerHTML = prgs+"%";
    } else {
        addProgressEl(f_name);
    }
}
/**
 * <div class="layout-row" data-file="InventoryExport_2-22-2016-16-38-10_0_attributes_0.txt">
 * <span flex="40" class="fname">InventoryExport_2-22-2016-16-38-10_0_attributes_0.txt</span>
 * <span layout="column" layout-align="center start" class="file-process-progress" flex="55">
 * <span></span>
 * </span>
 * <span flex="5" class="prgsval">100%</span>
 * </div>
 */
function addProgressEl(fn) {
    var fname_el = document.createElement("span");
    fname_el.setAttribute("style", "width:40%");
    fname_el.classList.add("fname");
    fname_el.innerHTML = fn;
    var prgs_ind = document.createElement("span");
    prgs_ind.classList.add("layout-column");
    prgs_ind.classList.add("layout-align-center-start");
    prgs_ind.setAttribute("style", "width:55%");
    prgs_ind.classList.add("file-process-progress");
    var sub_prgs_ind = document.createElement("span");
    prgs_ind.appendChild(sub_prgs_ind);

    var prgs_val = document.createElement("span");
    prgs_val.setAttribute("flex", "5");
    prgs_val.classList.add("prgsval");


    var prgs_box = document.createElement("div");
    prgs_box.classList.add("layout-row");
    prgs_box.setAttribute("data-file", fn);
    prgs_box.appendChild(fname_el);
    prgs_box.appendChild(prgs_ind);
    prgs_box.appendChild(prgs_val);

    var par_el = document.querySelector(".progress-info-panel");
    par_el.appendChild(prgs_box);

}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYV9idW5kbGVfaW1wb3J0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6aXAtYnVuZGxlLWVycm9yLWJ0blwiKS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnppcC1idW5kbGUtZXJyb3Itd3JhcHBlclwiKS5jbGFzc0xpc3QudG9nZ2xlKFwibmctaGlkZVwiKTtcbiAgICB9O1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiemlwLWJ1bmRsZS1kaXItZXJyb3ItYnRuXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuemlwLWJ1bmRsZS1kaXItZXJyb3Itd3JhcHBlclwiKS5jbGFzc0xpc3QudG9nZ2xlKFwibmctaGlkZVwiKTtcbiAgICB9O1xufTtcbmZ1bmN0aW9uIGluc3BlY3RJbnB1dChldikge1xuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MtcGFuZWwnKTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB2YXIgbmFtZXZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWZpbGUtY2hvb3NlJyk7XG4gICAgbmFtZXZhbHVlLmlubmVySFRNTCA9IGV2LnRhcmdldC52YWx1ZS5zcGxpdCgnXFxcXCcpLnBvcCgpO1xuICAgIHZhciB1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWRfYnRuJyk7XG4gICAgdWIucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xufVxuXG5mdW5jdGlvbiB1cGxvYWRGaWxlKCkge1xuICAgIHZhciBmaWxlX2Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsZWNob29zZScpO1xuICAgIHZhciBzcmNfZmlsZSA9IGZpbGVfZm9ybS5maWxlc1swXTtcbiAgICBpZiAoc3JjX2ZpbGUubmFtZS5zcGxpdCgnLicpLnBvcCgpLnRvTG93ZXJDYXNlKCkgIT09ICd6aXAnKSB7XG4gICAgICAgIHZhciB1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWRfYnRuJyk7XG4gICAgICAgIHViLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgIGFsZXJ0KCdJbnZhbGlkIGZpbGUgdHlwZS4uLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzcmNfZmlsZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2h1bmtfc2l6ZSA9IDEwMDAwMDAwO1xuICAgIGNodW5rX251bSA9IE1hdGguY2VpbChzcmNfZmlsZS5zaXplIC8gY2h1bmtfc2l6ZSk7XG4gICAgY2h1bmtzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaHVua19udW07IGkrKykge1xuICAgICAgICBjaHVuayA9IHNyY19maWxlLnNsaWNlKGNodW5rX3NpemUgKiBpLCBjaHVua19zaXplICogKGkgKyAxKSk7XG4gICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICB9XG4gICAgYmxvYnMgPSBbXTtcbiAgICB2YXIgY2h1bmtzX2xlbmd0aCA9IGNodW5rcy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGNodW5rc19sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgdmFyIGRhdGFfYXIgPSBbXTtcbiAgICAgICAgZGF0YV9hci5wdXNoKGNodW5rc19sZW5ndGggKyAnJmQmJyk7XG4gICAgICAgIGRhdGFfYXIucHVzaCgncGFydF8nICsgaWkpO1xuICAgICAgICBkYXRhX2FyLnB1c2goJyZkJicpO1xuICAgICAgICBkYXRhX2FyLnB1c2goY2h1bmtzW2lpXSk7XG4gICAgICAgIHZhciBuYmwgPSBuZXcgQmxvYihkYXRhX2FyLCB7XG4gICAgICAgICAgICB0eXBlOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJ1xuICAgICAgICB9KTtcbiAgICAgICAgYmxvYnMucHVzaChuYmwpO1xuICAgIH1cbiAgICB2YXIgYmxvYnNfbGVuZ3RoID0gYmxvYnMubGVuZ3RoO1xuICAgIGZvciAodmFyIGlpaSA9IDA7IGlpaSA8IGJsb2JzX2xlbmd0aDsgaWlpKyspIHtcbiAgICAgICAgdXBsb2FkKGJsb2JzW2lpaV0sIGlpaSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzdGFydENodW5rKCkge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub25sb2FkID0geGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGZhdWx0ID0gZmFsc2U7XG4gICAgICAgIHZhciBzdGF0ZSA9IHt9O1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQgJiYgc3RhdGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuZXJyb3IgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZS5lcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmYXVsdCAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHVwbG9hZEZpbGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi56aXAtYnVuZGxlLWRpci1lcnJvci13cmFwcGVyXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJuZy1oaWRlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRlLmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgXCIgKyB0aGlzLnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9idW5kbGUvc3RhcnRjaHVua1wiLCB0cnVlKTtcbiAgICB4aHIuc2VuZCgpO1xuICAgIHZhciB1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWRfYnRuJyk7XG4gICAgdWIuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkKGNodW5rLCBudW1iZXIpIHtcbiAgICBjcmVhdGVQcm9ncmVzc0JhcihudW1iZXIpO1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAvLyDQvtCx0YDQsNCx0L7RgtGH0LjQuiDQtNC70Y8g0LfQsNC60LDRh9C60LhcbiAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBwcm9ncmVzc0JhciA9IHt9O1xuICAgICAgICBpZiAoZS5sZW5ndGhDb21wdXRhYmxlKSB7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhci52YWx1ZSA9IChlLmxvYWRlZCAvIGUudG90YWwpICogMTAwO1xuICAgICAgICAgICAgdmFyIG1ldGVyX2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21ldGVyXycgKyBudW1iZXIpO1xuICAgICAgICAgICAgbWV0ZXJfZWwuc3R5bGUud2lkdGggPSBwcm9ncmVzc0Jhci52YWx1ZSArICclJztcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLnRleHRDb250ZW50ID0gcHJvZ3Jlc3NCYXIudmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC60Lgg0YPRgdC/0LXRhdCwINC4INC+0YjQuNCx0LrQuFxuICAgIC8vINC10YHQu9C4IHN0YXR1cyA9PSAyMDAsINGC0L4g0Y3RgtC+INGD0YHQv9C10YUsINC40L3QsNGH0LUg0L7RiNC40LHQutCwXG4gICAgeGhyLm9ubG9hZCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzLnN0YXRlID09PSAnZmluaXNoJykge1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBcIiArIHRoaXMuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsIFwiL2J1bmRsZS91cGxvYWRcIiwgdHJ1ZSk7XG4gICAgeGhyLnNlbmQoY2h1bmspO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9ncmVzc0JhcihudW1iZXIpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLXBhbmVsJyk7XG4gICAgdmFyIG1ldGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWV0ZXIuY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3MtYmFyLW1ldGVyJyk7XG4gICAgdmFyIHNwYW5fbWV0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bhbl9tZXRlci5pZCA9ICdtZXRlcl8nICsgbnVtYmVyO1xuICAgIG1ldGVyLmFwcGVuZENoaWxkKHNwYW5fbWV0ZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXRlcik7XG59XG5cbkNhV1MgPSBuZXcgV2ViU29ja2V0KCd3czovL2ZtdC1hcGkuY29tOjg4ODgnKTtcbkNhV1Mub25tZXNzYWdlID0gZnVuY3Rpb24oZXYpIHtcbiAgICBQcm9jZXNzaW5nTXNnKGV2LmRhdGEpO1xufTtcblxuZnVuY3Rpb24gUHJvY2Vzc2luZ01zZyhtc2cpIHtcbiAgICBpZiAobXNnLnN1YnN0cigxMCw2KSA9PT0gJ2J1bmRsZScpIHtcbiAgICAgICAgaWYgKG1zZy5zdWJzdHIoMTcsNCkgPT09ICdpbmZvJykge1xuICAgICAgICAgICAgc2hvd0luZm8obXNnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXNnLnN1YnN0cigxNyw0KSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICBzaG93UHJvZ3Jlc3MobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXNnLnN1YnN0cigxNywgNSkgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuemlwLWJ1bmRsZS1lcnJvci13cmFwcGVyXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJuZy1oaWRlXCIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9jZXNzLWluZm8tcGFuZWxcIikuaW5uZXJIVE1MPVwiXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzLWluZm8tcGFuZWxcIikuaW5uZXJIVE1MPVwiXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbmZ1bmN0aW9uIHNob3dJbmZvKG1zZykge1xuICAgIHZhciBpbmZvID0gbXNnLnN1YnN0cigyMik7XG4gICAgdmFyIGluZm9fZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgaW5mb19lbC5pbm5lckhUTUwgPSBpbmZvLnJlcGxhY2UoLzovaWcsICcgJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9jZXNzLWluZm8tcGFuZWxcIikuYXBwZW5kQ2hpbGQoaW5mb19lbCk7XG59XG5cbmZ1bmN0aW9uIHNob3dQcm9ncmVzcyhtc2cpIHtcbiAgICB2YXIgbXNnX2JvZHkgPSBtc2cuc3Vic3RyKDIyKTtcbiAgICB2YXIgbXNnX2FycmF5ID0gbXNnX2JvZHkuc3BsaXQoJzonKTtcbiAgICB2YXIgZl9uYW1lID0gbXNnX2FycmF5WzBdO1xuICAgIHZhciBwcmdzID0gbXNnX2FycmF5LnBvcCgpO1xuICAgIHZhciBleHAgPSBcIltkYXRhLWZpbGU9J1wiK2ZfbmFtZStcIiddXCI7XG4gICAgdmFyIHNfZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGV4cCk7XG4gICAgaWYgKHNfZWwgIT09IG51bGwgJiYgc19lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNfZWwucXVlcnlTZWxlY3RvcihcIi5maWxlLXByb2Nlc3MtcHJvZ3Jlc3NcIikucXVlcnlTZWxlY3RvcihcInNwYW5cIikuc3R5bGUud2lkdGggPSBwcmdzKyBcIiVcIjtcbiAgICAgICAgc19lbC5xdWVyeVNlbGVjdG9yKFwiLnByZ3N2YWxcIikuaW5uZXJIVE1MID0gcHJncytcIiVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhZGRQcm9ncmVzc0VsKGZfbmFtZSk7XG4gICAgfVxufVxuLyoqXG4gKiA8ZGl2IGNsYXNzPVwibGF5b3V0LXJvd1wiIGRhdGEtZmlsZT1cIkludmVudG9yeUV4cG9ydF8yLTIyLTIwMTYtMTYtMzgtMTBfMF9hdHRyaWJ1dGVzXzAudHh0XCI+XG4gKiA8c3BhbiBmbGV4PVwiNDBcIiBjbGFzcz1cImZuYW1lXCI+SW52ZW50b3J5RXhwb3J0XzItMjItMjAxNi0xNi0zOC0xMF8wX2F0dHJpYnV0ZXNfMC50eHQ8L3NwYW4+XG4gKiA8c3BhbiBsYXlvdXQ9XCJjb2x1bW5cIiBsYXlvdXQtYWxpZ249XCJjZW50ZXIgc3RhcnRcIiBjbGFzcz1cImZpbGUtcHJvY2Vzcy1wcm9ncmVzc1wiIGZsZXg9XCI1NVwiPlxuICogPHNwYW4+PC9zcGFuPlxuICogPC9zcGFuPlxuICogPHNwYW4gZmxleD1cIjVcIiBjbGFzcz1cInByZ3N2YWxcIj4xMDAlPC9zcGFuPlxuICogPC9kaXY+XG4gKi9cbmZ1bmN0aW9uIGFkZFByb2dyZXNzRWwoZm4pIHtcbiAgICB2YXIgZm5hbWVfZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBmbmFtZV9lbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIndpZHRoOjQwJVwiKTtcbiAgICBmbmFtZV9lbC5jbGFzc0xpc3QuYWRkKFwiZm5hbWVcIik7XG4gICAgZm5hbWVfZWwuaW5uZXJIVE1MID0gZm47XG4gICAgdmFyIHByZ3NfaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImxheW91dC1jb2x1bW5cIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImxheW91dC1hbGlnbi1jZW50ZXItc3RhcnRcIik7XG4gICAgcHJnc19pbmQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ3aWR0aDo1NSVcIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImZpbGUtcHJvY2Vzcy1wcm9ncmVzc1wiKTtcbiAgICB2YXIgc3ViX3ByZ3NfaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgcHJnc19pbmQuYXBwZW5kQ2hpbGQoc3ViX3ByZ3NfaW5kKTtcblxuICAgIHZhciBwcmdzX3ZhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHByZ3NfdmFsLnNldEF0dHJpYnV0ZShcImZsZXhcIiwgXCI1XCIpO1xuICAgIHByZ3NfdmFsLmNsYXNzTGlzdC5hZGQoXCJwcmdzdmFsXCIpO1xuXG5cbiAgICB2YXIgcHJnc19ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByZ3NfYm94LmNsYXNzTGlzdC5hZGQoXCJsYXlvdXQtcm93XCIpO1xuICAgIHByZ3NfYm94LnNldEF0dHJpYnV0ZShcImRhdGEtZmlsZVwiLCBmbik7XG4gICAgcHJnc19ib3guYXBwZW5kQ2hpbGQoZm5hbWVfZWwpO1xuICAgIHByZ3NfYm94LmFwcGVuZENoaWxkKHByZ3NfaW5kKTtcbiAgICBwcmdzX2JveC5hcHBlbmRDaGlsZChwcmdzX3ZhbCk7XG5cbiAgICB2YXIgcGFyX2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzcy1pbmZvLXBhbmVsXCIpO1xuICAgIHBhcl9lbC5hcHBlbmRDaGlsZChwcmdzX2JveCk7XG5cbn1cbiJdLCJmaWxlIjoiY2FfYnVuZGxlX2ltcG9ydC5qcyJ9
