window.onload = function () {
    document.getElementById("orders-error-btn").onclick = function () {
        document.querySelector(".orders-error-wrapper").classList.toggle("ng-hide");
    };
    document.getElementById("orders-dir-error-btn").onclick = function () {
        document.querySelector(".orders-dir-error-wrapper").classList.toggle("ng-hide");
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
    if (src_file.name.split('.').pop().toLowerCase() !== 'csv') {
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
                document.querySelector(".orders-error-wrapper").classList.toggle("ng-hide");
                console.log(state.error);
            }
        } else {
            console.log("error " + this.status);
        }
    };
    xhr.open("POST", "/order/startchunk", true);
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
    xhr.open("POST", "/order/upload", true);
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
    if (msg.substr(10,7) === 'caorder') {
        console.log(msg.substr(18,5));
        if (msg.substr(18,4) === 'info') {
            showInfo(msg);
        }
        if (msg.substr(18,4) === 'file') {
            showProgress(msg);
        }
        if (msg.substr(18, 5) === 'error') {
            document.querySelector(".orders-error-wrapper").classList.toggle("ng-hide");
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
    var msg_body = msg.substr(23);
    console.log(msg_body);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYV9vcmRlcnNfaW1wb3J0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcmRlcnMtZXJyb3ItYnRuXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3JkZXJzLWVycm9yLXdyYXBwZXJcIikuY2xhc3NMaXN0LnRvZ2dsZShcIm5nLWhpZGVcIik7XG4gICAgfTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9yZGVycy1kaXItZXJyb3ItYnRuXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3JkZXJzLWRpci1lcnJvci13cmFwcGVyXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJuZy1oaWRlXCIpO1xuICAgIH07XG59O1xuZnVuY3Rpb24gaW5zcGVjdElucHV0KGV2KSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1wYW5lbCcpO1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHZhciBuYW1ldmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtZmlsZS1jaG9vc2UnKTtcbiAgICBuYW1ldmFsdWUuaW5uZXJIVE1MID0gZXYudGFyZ2V0LnZhbHVlLnNwbGl0KCdcXFxcJykucG9wKCk7XG4gICAgdmFyIHViID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZF9idG4nKTtcbiAgICB1Yi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG59XG5cbmZ1bmN0aW9uIHVwbG9hZEZpbGUoKSB7XG4gICAgdmFyIGZpbGVfZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlY2hvb3NlJyk7XG4gICAgdmFyIHNyY19maWxlID0gZmlsZV9mb3JtLmZpbGVzWzBdO1xuICAgIGlmIChzcmNfZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCkudG9Mb3dlckNhc2UoKSAhPT0gJ2NzdicpIHtcbiAgICAgICAgdmFyIHViID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZF9idG4nKTtcbiAgICAgICAgdWIuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgICAgICAgYWxlcnQoJ0ludmFsaWQgZmlsZSB0eXBlLi4uJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHNyY19maWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjaHVua19zaXplID0gMTAwMDAwMDA7XG4gICAgY2h1bmtfbnVtID0gTWF0aC5jZWlsKHNyY19maWxlLnNpemUgLyBjaHVua19zaXplKTtcbiAgICBjaHVua3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNodW5rX251bTsgaSsrKSB7XG4gICAgICAgIGNodW5rID0gc3JjX2ZpbGUuc2xpY2UoY2h1bmtfc2l6ZSAqIGksIGNodW5rX3NpemUgKiAoaSArIDEpKTtcbiAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgIH1cbiAgICBibG9icyA9IFtdO1xuICAgIHZhciBjaHVua3NfbGVuZ3RoID0gY2h1bmtzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgY2h1bmtzX2xlbmd0aDsgaWkrKykge1xuICAgICAgICB2YXIgZGF0YV9hciA9IFtdO1xuICAgICAgICBkYXRhX2FyLnB1c2goY2h1bmtzX2xlbmd0aCArICcmZCYnKTtcbiAgICAgICAgZGF0YV9hci5wdXNoKCdwYXJ0XycgKyBpaSk7XG4gICAgICAgIGRhdGFfYXIucHVzaCgnJmQmJyk7XG4gICAgICAgIGRhdGFfYXIucHVzaChjaHVua3NbaWldKTtcbiAgICAgICAgdmFyIG5ibCA9IG5ldyBCbG9iKGRhdGFfYXIsIHtcbiAgICAgICAgICAgIHR5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG4gICAgICAgIH0pO1xuICAgICAgICBibG9icy5wdXNoKG5ibCk7XG4gICAgfVxuICAgIHZhciBibG9ic19sZW5ndGggPSBibG9icy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaWlpID0gMDsgaWlpIDwgYmxvYnNfbGVuZ3RoOyBpaWkrKykge1xuICAgICAgICB1cGxvYWQoYmxvYnNbaWlpXSwgaWlpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0Q2h1bmsoKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vbmxvYWQgPSB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHN0YXRlID0ge307XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHN0YXRlLmVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmF1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZhdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdXBsb2FkRmlsZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9yZGVycy1lcnJvci13cmFwcGVyXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJuZy1oaWRlXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRlLmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgXCIgKyB0aGlzLnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9vcmRlci9zdGFydGNodW5rXCIsIHRydWUpO1xuICAgIHhoci5zZW5kKCk7XG4gICAgdmFyIHViID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VwbG9hZF9idG4nKTtcbiAgICB1Yi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xufVxuXG5mdW5jdGlvbiB1cGxvYWQoY2h1bmssIG51bWJlcikge1xuICAgIGNyZWF0ZVByb2dyZXNzQmFyKG51bWJlcik7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIC8vINC+0LHRgNCw0LHQvtGC0YfQuNC6INC00LvRjyDQt9Cw0LrQsNGH0LrQuFxuICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzQmFyID0ge307XG4gICAgICAgIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLnZhbHVlID0gKGUubG9hZGVkIC8gZS50b3RhbCkgKiAxMDA7XG4gICAgICAgICAgICB2YXIgbWV0ZXJfZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWV0ZXJfJyArIG51bWJlcik7XG4gICAgICAgICAgICBtZXRlcl9lbC5zdHlsZS53aWR0aCA9IHByb2dyZXNzQmFyLnZhbHVlICsgJyUnO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIudGV4dENvbnRlbnQgPSBwcm9ncmVzc0Jhci52YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8g0L7QsdGA0LDQsdC+0YLRh9C40LrQuCDRg9GB0L/QtdGF0LAg0Lgg0L7RiNC40LHQutC4XG4gICAgLy8g0LXRgdC70Lggc3RhdHVzID09IDIwMCwg0YLQviDRjdGC0L4g0YPRgdC/0LXRhSwg0LjQvdCw0YfQtSDQvtGI0LjQsdC60LBcbiAgICB4aHIub25sb2FkID0geGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0dXMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMuc3RhdGUgPT09ICdmaW5pc2gnKSB7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIFwiICsgdGhpcy5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvb3JkZXIvdXBsb2FkXCIsIHRydWUpO1xuICAgIHhoci5zZW5kKGNodW5rKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvZ3Jlc3NCYXIobnVtYmVyKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1wYW5lbCcpO1xuICAgIHZhciBtZXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1ldGVyLmNsYXNzTGlzdC5hZGQoJ3Byb2dyZXNzLWJhci1tZXRlcicpO1xuICAgIHZhciBzcGFuX21ldGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIHNwYW5fbWV0ZXIuaWQgPSAnbWV0ZXJfJyArIG51bWJlcjtcbiAgICBtZXRlci5hcHBlbmRDaGlsZChzcGFuX21ldGVyKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWV0ZXIpO1xufVxuXG5DYVdTID0gbmV3IFdlYlNvY2tldCgnd3M6Ly9mbXQtYXBpLmNvbTo4ODg4Jyk7XG5DYVdTLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2KSB7XG4gICAgUHJvY2Vzc2luZ01zZyhldi5kYXRhKTtcbn07XG5cbmZ1bmN0aW9uIFByb2Nlc3NpbmdNc2cobXNnKSB7XG4gICAgaWYgKG1zZy5zdWJzdHIoMTAsNykgPT09ICdjYW9yZGVyJykge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cuc3Vic3RyKDE4LDUpKTtcbiAgICAgICAgaWYgKG1zZy5zdWJzdHIoMTgsNCkgPT09ICdpbmZvJykge1xuICAgICAgICAgICAgc2hvd0luZm8obXNnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXNnLnN1YnN0cigxOCw0KSA9PT0gJ2ZpbGUnKSB7XG4gICAgICAgICAgICBzaG93UHJvZ3Jlc3MobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobXNnLnN1YnN0cigxOCwgNSkgPT09ICdlcnJvcicpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3JkZXJzLWVycm9yLXdyYXBwZXJcIikuY2xhc3NMaXN0LnRvZ2dsZShcIm5nLWhpZGVcIik7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2Nlc3MtaW5mby1wYW5lbFwiKS5pbm5lckhUTUw9XCJcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZ3Jlc3MtaW5mby1wYW5lbFwiKS5pbm5lckhUTUw9XCJcIjtcbiAgICAgICAgfVxuICAgIH1cblxufVxuZnVuY3Rpb24gc2hvd0luZm8obXNnKSB7XG4gICAgdmFyIGluZm8gPSBtc2cuc3Vic3RyKDIyKTtcbiAgICB2YXIgaW5mb19lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBpbmZvX2VsLmlubmVySFRNTCA9IGluZm8ucmVwbGFjZSgvOi9pZywgJyAnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2Nlc3MtaW5mby1wYW5lbFwiKS5hcHBlbmRDaGlsZChpbmZvX2VsKTtcbn1cblxuZnVuY3Rpb24gc2hvd1Byb2dyZXNzKG1zZykge1xuICAgIHZhciBtc2dfYm9keSA9IG1zZy5zdWJzdHIoMjMpO1xuICAgIGNvbnNvbGUubG9nKG1zZ19ib2R5KTtcbiAgICB2YXIgbXNnX2FycmF5ID0gbXNnX2JvZHkuc3BsaXQoJzonKTtcbiAgICB2YXIgZl9uYW1lID0gbXNnX2FycmF5WzBdO1xuICAgIHZhciBwcmdzID0gbXNnX2FycmF5LnBvcCgpO1xuICAgIHZhciBleHAgPSBcIltkYXRhLWZpbGU9J1wiK2ZfbmFtZStcIiddXCI7XG4gICAgdmFyIHNfZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGV4cCk7XG4gICAgaWYgKHNfZWwgIT09IG51bGwgJiYgc19lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNfZWwucXVlcnlTZWxlY3RvcihcIi5maWxlLXByb2Nlc3MtcHJvZ3Jlc3NcIikucXVlcnlTZWxlY3RvcihcInNwYW5cIikuc3R5bGUud2lkdGggPSBwcmdzKyBcIiVcIjtcbiAgICAgICAgc19lbC5xdWVyeVNlbGVjdG9yKFwiLnByZ3N2YWxcIikuaW5uZXJIVE1MID0gcHJncytcIiVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhZGRQcm9ncmVzc0VsKGZfbmFtZSk7XG4gICAgfVxufVxuLyoqXG4gKiA8ZGl2IGNsYXNzPVwibGF5b3V0LXJvd1wiIGRhdGEtZmlsZT1cIkludmVudG9yeUV4cG9ydF8yLTIyLTIwMTYtMTYtMzgtMTBfMF9hdHRyaWJ1dGVzXzAudHh0XCI+XG4gKiA8c3BhbiBmbGV4PVwiNDBcIiBjbGFzcz1cImZuYW1lXCI+SW52ZW50b3J5RXhwb3J0XzItMjItMjAxNi0xNi0zOC0xMF8wX2F0dHJpYnV0ZXNfMC50eHQ8L3NwYW4+XG4gKiA8c3BhbiBsYXlvdXQ9XCJjb2x1bW5cIiBsYXlvdXQtYWxpZ249XCJjZW50ZXIgc3RhcnRcIiBjbGFzcz1cImZpbGUtcHJvY2Vzcy1wcm9ncmVzc1wiIGZsZXg9XCI1NVwiPlxuICogPHNwYW4+PC9zcGFuPlxuICogPC9zcGFuPlxuICogPHNwYW4gZmxleD1cIjVcIiBjbGFzcz1cInByZ3N2YWxcIj4xMDAlPC9zcGFuPlxuICogPC9kaXY+XG4gKi9cbmZ1bmN0aW9uIGFkZFByb2dyZXNzRWwoZm4pIHtcbiAgICB2YXIgZm5hbWVfZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBmbmFtZV9lbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIndpZHRoOjQwJVwiKTtcbiAgICBmbmFtZV9lbC5jbGFzc0xpc3QuYWRkKFwiZm5hbWVcIik7XG4gICAgZm5hbWVfZWwuaW5uZXJIVE1MID0gZm47XG4gICAgdmFyIHByZ3NfaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImxheW91dC1jb2x1bW5cIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImxheW91dC1hbGlnbi1jZW50ZXItc3RhcnRcIik7XG4gICAgcHJnc19pbmQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ3aWR0aDo1NSVcIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImZpbGUtcHJvY2Vzcy1wcm9ncmVzc1wiKTtcbiAgICB2YXIgc3ViX3ByZ3NfaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgcHJnc19pbmQuYXBwZW5kQ2hpbGQoc3ViX3ByZ3NfaW5kKTtcblxuICAgIHZhciBwcmdzX3ZhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHByZ3NfdmFsLnNldEF0dHJpYnV0ZShcImZsZXhcIiwgXCI1XCIpO1xuICAgIHByZ3NfdmFsLmNsYXNzTGlzdC5hZGQoXCJwcmdzdmFsXCIpO1xuXG5cbiAgICB2YXIgcHJnc19ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByZ3NfYm94LmNsYXNzTGlzdC5hZGQoXCJsYXlvdXQtcm93XCIpO1xuICAgIHByZ3NfYm94LnNldEF0dHJpYnV0ZShcImRhdGEtZmlsZVwiLCBmbik7XG4gICAgcHJnc19ib3guYXBwZW5kQ2hpbGQoZm5hbWVfZWwpO1xuICAgIHByZ3NfYm94LmFwcGVuZENoaWxkKHByZ3NfaW5kKTtcbiAgICBwcmdzX2JveC5hcHBlbmRDaGlsZChwcmdzX3ZhbCk7XG5cbiAgICB2YXIgcGFyX2VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzcy1pbmZvLXBhbmVsXCIpO1xuICAgIHBhcl9lbC5hcHBlbmRDaGlsZChwcmdzX2JveCk7XG5cbn1cbiJdLCJmaWxlIjoiY2Ffb3JkZXJzX2ltcG9ydC5qcyJ9
