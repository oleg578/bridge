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
