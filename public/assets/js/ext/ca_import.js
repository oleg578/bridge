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
    xhr.onload = xhr.onerror = function () {
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
                document.querySelector("#caparser-errmsg").innerHTML = state.error;
                document.querySelector(".zip-bundle-dir-error-wrapper").classList.toggle("ng-hide");
                console.log(state.error);
            }
        } else {
            console.log("error " + this.status);
        }
    };
    xhr.open("POST", "/product/startchunk", true);
    xhr.send();
    var ub = document.querySelector('#upload_btn');
    ub.setAttribute('disabled', '');
}

function upload(chunk, number) {
    createProgressBar(number);
    var xhr = new XMLHttpRequest();
    //upload handler
    xhr.upload.onprogress = function (e) {
        var progressBar = {};
        if (e.lengthComputable) {
            progressBar.value = (e.loaded / e.total) * 100;
            var meter_el = document.querySelector('#meter_' + number);
            meter_el.style.width = progressBar.value + '%';
            progressBar.textContent = progressBar.value;
        }
    };
    // if status == 200, then success, error else
    xhr.onload = xhr.onerror = function () {
        if (this.status == 200) {
            if (xhr.readyState === 4) {
                if (xhr.response.length > 0) {
                    var status = JSON.parse(xhr.response);
                    if (status.state === 'finish') {
                        console.log('upload finish');
                    }
                }
            }
        } else {
            console.log("error " + this.status);
        }
    };
    xhr.open("POST", "/product/upload", true);
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
CaWS.onmessage = function (ev) {
    ProcessingMsg(ev.data);
};

function ProcessingMsg(msg) {
    if (msg.substr(10, 8) === 'caparser') {
        if (msg.substr(19, 4) === 'info') {
            showInfo(msg);
        }
        if (msg.substr(19, 8) === 'logerror') {
            showAlert(msg);
        }
        if (msg.substr(19, 4) === 'file') {
            showProgress(msg);
        }
        if (msg.substr(19, 5) === 'error') {
            if (document.querySelector(".zip-bundle-error-wrapper").classList.contains("ng-hide")) {
                document.querySelector(".zip-bundle-error-wrapper").classList.remove("ng-hide");
            }
            document.querySelector("#progress-panel").innerHTML = "";
            document.querySelector(".process-info-panel").innerHTML = "";
            document.querySelector(".progress-info-panel").innerHTML = "";
        }
    }
    if (msg.substr(10, 4) === 'hook') {
        showHookInfo(msg);
    }
}

function showInfo(msg) {
    var info = msg.substr(24);
    var info_el = document.createElement('p');
    info_el.innerHTML = info.replace(/:/ig, ' ');
    document.querySelector(".process-info-panel").appendChild(info_el);
}

function showAlert(msg) {
    var info = msg.substr(28);
    document.querySelector("#alert-box").innerHTML = info;
    document.querySelector("#alert-box-container").classList.remove("ng-hide");
}

function showHookInfo(msg) {
    var info = msg.substr(15);
    var info_el = document.createElement('p');
    info_el.innerHTML = info.replace(/:/ig, ' ');
    document.querySelector(".process-info-panel").appendChild(info_el);
}

function showProgress(msg) {
    var msg_body = msg.substr(24);
    var msg_array = msg_body.split(':');
    var f_name = msg_array[0];
    var prgs = msg_array.pop();
    var exp = "[data-file='" + f_name + "']";
    var s_el = document.querySelector(exp);
    if (s_el !== null && s_el !== undefined) {
        s_el.querySelector(".file-process-progress").querySelector("span").style.width = prgs + "%";
        s_el.querySelector(".prgsval").innerHTML = prgs + "%";
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
    sub_prgs_ind.style.width = "0%";
    prgs_ind.appendChild(sub_prgs_ind);

    var prgs_val = document.createElement("span");
    prgs_val.setAttribute("flex", "5");
    prgs_val.innerHTML = "0%";
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYV9pbXBvcnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInppcC1idW5kbGUtZXJyb3ItYnRuXCIpLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuemlwLWJ1bmRsZS1lcnJvci13cmFwcGVyXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJuZy1oaWRlXCIpO1xuICAgIH07XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ6aXAtYnVuZGxlLWRpci1lcnJvci1idG5cIikub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi56aXAtYnVuZGxlLWRpci1lcnJvci13cmFwcGVyXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJuZy1oaWRlXCIpO1xuICAgIH07XG59O1xuXG5mdW5jdGlvbiBpbnNwZWN0SW5wdXQoZXYpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLXBhbmVsJyk7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdmFyIG5hbWV2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1maWxlLWNob29zZScpO1xuICAgIG5hbWV2YWx1ZS5pbm5lckhUTUwgPSBldi50YXJnZXQudmFsdWUuc3BsaXQoJ1xcXFwnKS5wb3AoKTtcbiAgICB2YXIgdWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkX2J0bicpO1xuICAgIHViLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkRmlsZSgpIHtcbiAgICB2YXIgZmlsZV9mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGVjaG9vc2UnKTtcbiAgICB2YXIgc3JjX2ZpbGUgPSBmaWxlX2Zvcm0uZmlsZXNbMF07XG4gICAgaWYgKHNyY19maWxlLm5hbWUuc3BsaXQoJy4nKS5wb3AoKS50b0xvd2VyQ2FzZSgpICE9PSAnemlwJykge1xuICAgICAgICB2YXIgdWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdXBsb2FkX2J0bicpO1xuICAgICAgICB1Yi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpO1xuICAgICAgICBhbGVydCgnSW52YWxpZCBmaWxlIHR5cGUuLi4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3JjX2ZpbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNodW5rX3NpemUgPSAxMDAwMDAwMDtcbiAgICBjaHVua19udW0gPSBNYXRoLmNlaWwoc3JjX2ZpbGUuc2l6ZSAvIGNodW5rX3NpemUpO1xuICAgIGNodW5rcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtfbnVtOyBpKyspIHtcbiAgICAgICAgY2h1bmsgPSBzcmNfZmlsZS5zbGljZShjaHVua19zaXplICogaSwgY2h1bmtfc2l6ZSAqIChpICsgMSkpO1xuICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgfVxuICAgIGJsb2JzID0gW107XG4gICAgdmFyIGNodW5rc19sZW5ndGggPSBjaHVua3MubGVuZ3RoO1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBjaHVua3NfbGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIHZhciBkYXRhX2FyID0gW107XG4gICAgICAgIGRhdGFfYXIucHVzaChjaHVua3NfbGVuZ3RoICsgJyZkJicpO1xuICAgICAgICBkYXRhX2FyLnB1c2goJ3BhcnRfJyArIGlpKTtcbiAgICAgICAgZGF0YV9hci5wdXNoKCcmZCYnKTtcbiAgICAgICAgZGF0YV9hci5wdXNoKGNodW5rc1tpaV0pO1xuICAgICAgICB2YXIgbmJsID0gbmV3IEJsb2IoZGF0YV9hciwge1xuICAgICAgICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSdcbiAgICAgICAgfSk7XG4gICAgICAgIGJsb2JzLnB1c2gobmJsKTtcbiAgICB9XG4gICAgdmFyIGJsb2JzX2xlbmd0aCA9IGJsb2JzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpaWkgPSAwOyBpaWkgPCBibG9ic19sZW5ndGg7IGlpaSsrKSB7XG4gICAgICAgIHVwbG9hZChibG9ic1tpaWldLCBpaWkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3RhcnRDaHVuaygpIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9ubG9hZCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHN0YXRlID0ge307XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5lcnJvciAhPT0gdW5kZWZpbmVkICYmIHN0YXRlLmVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5lcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmF1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZhdWx0ICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdXBsb2FkRmlsZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcGFyc2VyLWVycm1zZ1wiKS5pbm5lckhUTUwgPSBzdGF0ZS5lcnJvcjtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnppcC1idW5kbGUtZGlyLWVycm9yLXdyYXBwZXJcIikuY2xhc3NMaXN0LnRvZ2dsZShcIm5nLWhpZGVcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdGUuZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciBcIiArIHRoaXMuc3RhdHVzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsIFwiL3Byb2R1Y3Qvc3RhcnRjaHVua1wiLCB0cnVlKTtcbiAgICB4aHIuc2VuZCgpO1xuICAgIHZhciB1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGxvYWRfYnRuJyk7XG4gICAgdWIuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbn1cblxuZnVuY3Rpb24gdXBsb2FkKGNodW5rLCBudW1iZXIpIHtcbiAgICBjcmVhdGVQcm9ncmVzc0JhcihudW1iZXIpO1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAvL3VwbG9hZCBoYW5kbGVyXG4gICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzQmFyID0ge307XG4gICAgICAgIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHtcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLnZhbHVlID0gKGUubG9hZGVkIC8gZS50b3RhbCkgKiAxMDA7XG4gICAgICAgICAgICB2YXIgbWV0ZXJfZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWV0ZXJfJyArIG51bWJlcik7XG4gICAgICAgICAgICBtZXRlcl9lbC5zdHlsZS53aWR0aCA9IHByb2dyZXNzQmFyLnZhbHVlICsgJyUnO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIudGV4dENvbnRlbnQgPSBwcm9ncmVzc0Jhci52YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gaWYgc3RhdHVzID09IDIwMCwgdGhlbiBzdWNjZXNzLCBlcnJvciBlbHNlXG4gICAgeGhyLm9ubG9hZCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cy5zdGF0ZSA9PT0gJ2ZpbmlzaCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd1cGxvYWQgZmluaXNoJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIFwiICsgdGhpcy5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvcHJvZHVjdC91cGxvYWRcIiwgdHJ1ZSk7XG4gICAgeGhyLnNlbmQoY2h1bmspO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9ncmVzc0JhcihudW1iZXIpIHtcbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLXBhbmVsJyk7XG4gICAgdmFyIG1ldGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWV0ZXIuY2xhc3NMaXN0LmFkZCgncHJvZ3Jlc3MtYmFyLW1ldGVyJyk7XG4gICAgdmFyIHNwYW5fbWV0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bhbl9tZXRlci5pZCA9ICdtZXRlcl8nICsgbnVtYmVyO1xuICAgIG1ldGVyLmFwcGVuZENoaWxkKHNwYW5fbWV0ZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZXRlcik7XG59XG5cbkNhV1MgPSBuZXcgV2ViU29ja2V0KCd3czovL2ZtdC1hcGkuY29tOjg4ODgnKTtcbkNhV1Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgUHJvY2Vzc2luZ01zZyhldi5kYXRhKTtcbn07XG5cbmZ1bmN0aW9uIFByb2Nlc3NpbmdNc2cobXNnKSB7XG4gICAgaWYgKG1zZy5zdWJzdHIoMTAsIDgpID09PSAnY2FwYXJzZXInKSB7XG4gICAgICAgIGlmIChtc2cuc3Vic3RyKDE5LCA0KSA9PT0gJ2luZm8nKSB7XG4gICAgICAgICAgICBzaG93SW5mbyhtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtc2cuc3Vic3RyKDE5LCA4KSA9PT0gJ2xvZ2Vycm9yJykge1xuICAgICAgICAgICAgc2hvd0FsZXJ0KG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1zZy5zdWJzdHIoMTksIDQpID09PSAnZmlsZScpIHtcbiAgICAgICAgICAgIHNob3dQcm9ncmVzcyhtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtc2cuc3Vic3RyKDE5LCA1KSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuemlwLWJ1bmRsZS1lcnJvci13cmFwcGVyXCIpLmNsYXNzTGlzdC5jb250YWlucyhcIm5nLWhpZGVcIikpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnppcC1idW5kbGUtZXJyb3Itd3JhcHBlclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwibmctaGlkZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZ3Jlc3MtcGFuZWxcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvY2Vzcy1pbmZvLXBhbmVsXCIpLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzLWluZm8tcGFuZWxcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnN1YnN0cigxMCwgNCkgPT09ICdob29rJykge1xuICAgICAgICBzaG93SG9va0luZm8obXNnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNob3dJbmZvKG1zZykge1xuICAgIHZhciBpbmZvID0gbXNnLnN1YnN0cigyNCk7XG4gICAgdmFyIGluZm9fZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgaW5mb19lbC5pbm5lckhUTUwgPSBpbmZvLnJlcGxhY2UoLzovaWcsICcgJyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9jZXNzLWluZm8tcGFuZWxcIikuYXBwZW5kQ2hpbGQoaW5mb19lbCk7XG59XG5cbmZ1bmN0aW9uIHNob3dBbGVydChtc2cpIHtcbiAgICB2YXIgaW5mbyA9IG1zZy5zdWJzdHIoMjgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWxlcnQtYm94XCIpLmlubmVySFRNTCA9IGluZm87XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbGVydC1ib3gtY29udGFpbmVyXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJuZy1oaWRlXCIpO1xufVxuXG5mdW5jdGlvbiBzaG93SG9va0luZm8obXNnKSB7XG4gICAgdmFyIGluZm8gPSBtc2cuc3Vic3RyKDE1KTtcbiAgICB2YXIgaW5mb19lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBpbmZvX2VsLmlubmVySFRNTCA9IGluZm8ucmVwbGFjZSgvOi9pZywgJyAnKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2Nlc3MtaW5mby1wYW5lbFwiKS5hcHBlbmRDaGlsZChpbmZvX2VsKTtcbn1cblxuZnVuY3Rpb24gc2hvd1Byb2dyZXNzKG1zZykge1xuICAgIHZhciBtc2dfYm9keSA9IG1zZy5zdWJzdHIoMjQpO1xuICAgIHZhciBtc2dfYXJyYXkgPSBtc2dfYm9keS5zcGxpdCgnOicpO1xuICAgIHZhciBmX25hbWUgPSBtc2dfYXJyYXlbMF07XG4gICAgdmFyIHByZ3MgPSBtc2dfYXJyYXkucG9wKCk7XG4gICAgdmFyIGV4cCA9IFwiW2RhdGEtZmlsZT0nXCIgKyBmX25hbWUgKyBcIiddXCI7XG4gICAgdmFyIHNfZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGV4cCk7XG4gICAgaWYgKHNfZWwgIT09IG51bGwgJiYgc19lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNfZWwucXVlcnlTZWxlY3RvcihcIi5maWxlLXByb2Nlc3MtcHJvZ3Jlc3NcIikucXVlcnlTZWxlY3RvcihcInNwYW5cIikuc3R5bGUud2lkdGggPSBwcmdzICsgXCIlXCI7XG4gICAgICAgIHNfZWwucXVlcnlTZWxlY3RvcihcIi5wcmdzdmFsXCIpLmlubmVySFRNTCA9IHByZ3MgKyBcIiVcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhZGRQcm9ncmVzc0VsKGZfbmFtZSk7XG4gICAgfVxufVxuLyoqXG4gKiA8ZGl2IGNsYXNzPVwibGF5b3V0LXJvd1wiIGRhdGEtZmlsZT1cIkludmVudG9yeUV4cG9ydF8yLTIyLTIwMTYtMTYtMzgtMTBfMF9hdHRyaWJ1dGVzXzAudHh0XCI+XG4gKiA8c3BhbiBmbGV4PVwiNDBcIiBjbGFzcz1cImZuYW1lXCI+SW52ZW50b3J5RXhwb3J0XzItMjItMjAxNi0xNi0zOC0xMF8wX2F0dHJpYnV0ZXNfMC50eHQ8L3NwYW4+XG4gKiA8c3BhbiBsYXlvdXQ9XCJjb2x1bW5cIiBsYXlvdXQtYWxpZ249XCJjZW50ZXIgc3RhcnRcIiBjbGFzcz1cImZpbGUtcHJvY2Vzcy1wcm9ncmVzc1wiIGZsZXg9XCI1NVwiPlxuICogPHNwYW4+PC9zcGFuPlxuICogPC9zcGFuPlxuICogPHNwYW4gZmxleD1cIjVcIiBjbGFzcz1cInByZ3N2YWxcIj4xMDAlPC9zcGFuPlxuICogPC9kaXY+XG4gKi9cbmZ1bmN0aW9uIGFkZFByb2dyZXNzRWwoZm4pIHtcbiAgICB2YXIgZm5hbWVfZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBmbmFtZV9lbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIndpZHRoOjQwJVwiKTtcbiAgICBmbmFtZV9lbC5jbGFzc0xpc3QuYWRkKFwiZm5hbWVcIik7XG4gICAgZm5hbWVfZWwuaW5uZXJIVE1MID0gZm47XG4gICAgdmFyIHByZ3NfaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImxheW91dC1jb2x1bW5cIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImxheW91dC1hbGlnbi1jZW50ZXItc3RhcnRcIik7XG4gICAgcHJnc19pbmQuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJ3aWR0aDo1NSVcIik7XG4gICAgcHJnc19pbmQuY2xhc3NMaXN0LmFkZChcImZpbGUtcHJvY2Vzcy1wcm9ncmVzc1wiKTtcbiAgICB2YXIgc3ViX3ByZ3NfaW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgc3ViX3ByZ3NfaW5kLnN0eWxlLndpZHRoID0gXCIwJVwiO1xuICAgIHByZ3NfaW5kLmFwcGVuZENoaWxkKHN1Yl9wcmdzX2luZCk7XG5cbiAgICB2YXIgcHJnc192YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBwcmdzX3ZhbC5zZXRBdHRyaWJ1dGUoXCJmbGV4XCIsIFwiNVwiKTtcbiAgICBwcmdzX3ZhbC5pbm5lckhUTUwgPSBcIjAlXCI7XG4gICAgcHJnc192YWwuY2xhc3NMaXN0LmFkZChcInByZ3N2YWxcIik7XG5cblxuICAgIHZhciBwcmdzX2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJnc19ib3guY2xhc3NMaXN0LmFkZChcImxheW91dC1yb3dcIik7XG4gICAgcHJnc19ib3guc2V0QXR0cmlidXRlKFwiZGF0YS1maWxlXCIsIGZuKTtcbiAgICBwcmdzX2JveC5hcHBlbmRDaGlsZChmbmFtZV9lbCk7XG4gICAgcHJnc19ib3guYXBwZW5kQ2hpbGQocHJnc19pbmQpO1xuICAgIHByZ3NfYm94LmFwcGVuZENoaWxkKHByZ3NfdmFsKTtcblxuICAgIHZhciBwYXJfZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzLWluZm8tcGFuZWxcIik7XG4gICAgcGFyX2VsLmFwcGVuZENoaWxkKHByZ3NfYm94KTtcblxufSJdLCJmaWxlIjoiY2FfaW1wb3J0LmpzIn0=
