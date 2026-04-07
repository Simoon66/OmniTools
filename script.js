// Page Navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.warn(`Page with ID ${pageId}-page not found. Defaulting to home.`);
        const homePage = document.getElementById('home-page');
        if (homePage) homePage.classList.add('active');
    }
    window.scrollTo(0, 0);
}

// Tool Filtering
function filterTools() {
    const query = document.getElementById('tool-search').value.toLowerCase();
    const cards = document.querySelectorAll('.tool-card');
    
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const desc = card.querySelector('p').innerText.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Open Specific Tool
function openTool(toolId) {
    showPage('tool');
    const container = document.getElementById('tool-container');
    container.innerHTML = ''; // Clear previous

    if (toolId === 'img-to-png') renderImgToPng();
    if (toolId === 'img-compress') renderImgCompress();
    if (toolId === 'text-case') renderTextCase();
    if (toolId === 'word-counter') renderWordCounter();
    if (toolId === 'calculator') renderCalculator();
    
    lucide.createIcons();
}

// --- Tool Renderers ---

function renderImgToPng() {
    const container = document.getElementById('tool-container');
    container.innerHTML = `
        <div class="tool-ui-container">
            <h2>Image to PNG</h2>
            <div class="upload-area" id="drop-zone">
                <i data-lucide="upload"></i>
                <p>Click or drag image to upload</p>
                <input type="file" id="file-input" hidden accept="image/*">
            </div>
            <div id="preview-area" style="display:none; text-align:center;">
                <img id="img-preview" style="max-width:100%; max-height:300px; border-radius:15px; margin-bottom:20px;">
                <br>
                <button class="btn btn-primary" id="convert-btn">Convert & Download PNG</button>
            </div>
        </div>
    `;

    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewArea = document.getElementById('preview-area');
    const imgPreview = document.getElementById('img-preview');
    const convertBtn = document.getElementById('convert-btn');

    dropZone.onclick = () => fileInput.click();
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imgPreview.src = event.target.result;
                previewArea.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    };

    convertBtn.onclick = () => {
        const canvas = document.createElement('canvas');
        canvas.width = imgPreview.naturalWidth;
        canvas.height = imgPreview.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgPreview, 0, 0);
        const link = document.createElement('a');
        link.download = 'converted.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
}

function renderImgCompress() {
    const container = document.getElementById('tool-container');
    container.innerHTML = `
        <div class="tool-ui-container">
            <h2>Image Compressor</h2>
            <div class="upload-area" id="drop-zone">
                <i data-lucide="layers"></i>
                <p>Upload image to compress</p>
                <input type="file" id="file-input" hidden accept="image/*">
            </div>
            <div id="preview-area" style="display:none; width:100%; text-align:center;">
                <p style="margin-bottom:10px;">Quality: <span id="q-val">70</span>%</p>
                <input type="range" id="quality" min="10" max="100" value="70" style="width:100%; margin-bottom:20px;">
                <button class="btn btn-primary" id="compress-btn">Compress & Download</button>
            </div>
        </div>
    `;

    const fileInput = document.getElementById('file-input');
    const dropZone = document.getElementById('drop-zone');
    const qualityInput = document.getElementById('quality');
    const qVal = document.getElementById('q-val');
    const compressBtn = document.getElementById('compress-btn');
    const previewArea = document.getElementById('preview-area');

    dropZone.onclick = () => fileInput.click();
    qualityInput.oninput = () => qVal.innerText = qualityInput.value;

    fileInput.onchange = () => previewArea.style.display = 'block';

    compressBtn.onclick = () => {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const link = document.createElement('a');
                link.download = 'compressed.jpg';
                link.href = canvas.toDataURL('image/jpeg', qualityInput.value / 100);
                link.click();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };
}

function renderTextCase() {
    const container = document.getElementById('tool-container');
    container.innerHTML = `
        <div class="tool-ui-container">
            <h2>Text Case Converter</h2>
            <textarea id="text-input" placeholder="Paste your text here..."></textarea>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="convertCase('upper')">UPPERCASE</button>
                <button class="btn btn-primary" onclick="convertCase('lower')">lowercase</button>
                <button class="btn btn-primary" onclick="convertCase('title')">Title Case</button>
                <button class="btn btn-success" onclick="copyText()">Copy Text</button>
            </div>
        </div>
    `;
}

window.convertCase = (type) => {
    const input = document.getElementById('text-input');
    if (type === 'upper') input.value = input.value.toUpperCase();
    if (type === 'lower') input.value = input.value.toLowerCase();
    if (type === 'title') {
        input.value = input.value.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
};

window.copyText = () => {
    const input = document.getElementById('text-input');
    input.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
};

function renderWordCounter() {
    const container = document.getElementById('tool-container');
    container.innerHTML = `
        <div class="tool-ui-container">
            <h2>Word Counter</h2>
            <div style="display:flex; gap:20px; margin-bottom:20px;">
                <div style="text-align:center;"><b>Words:</b> <span id="w-count">0</span></div>
                <div style="text-align:center;"><b>Chars:</b> <span id="c-count">0</span></div>
            </div>
            <textarea id="word-input" placeholder="Start typing..."></textarea>
        </div>
    `;

    const input = document.getElementById('word-input');
    input.oninput = () => {
        const text = input.value.trim();
        document.getElementById('w-count').innerText = text ? text.split(/\s+/).length : 0;
        document.getElementById('c-count').innerText = input.value.length;
    };
}

function renderCalculator() {
    const container = document.getElementById('tool-container');
    container.innerHTML = `
        <div class="tool-ui-container">
            <h2>Smart Calculator</h2>
            <div class="calc-display" id="calc-display">0</div>
            <div class="calc-grid">
                <button class="calc-btn" onclick="calcInput('C')">C</button>
                <button class="calc-btn" onclick="calcInput('(')">(</button>
                <button class="calc-btn" onclick="calcInput(')')">)</button>
                <button class="calc-btn" onclick="calcInput('/')">/</button>
                <button class="calc-btn" onclick="calcInput('7')">7</button>
                <button class="calc-btn" onclick="calcInput('8')">8</button>
                <button class="calc-btn" onclick="calcInput('9')">9</button>
                <button class="calc-btn" onclick="calcInput('*')">*</button>
                <button class="calc-btn" onclick="calcInput('4')">4</button>
                <button class="calc-btn" onclick="calcInput('5')">5</button>
                <button class="calc-btn" onclick="calcInput('6')">6</button>
                <button class="calc-btn" onclick="calcInput('-')">-</button>
                <button class="calc-btn" onclick="calcInput('1')">1</button>
                <button class="calc-btn" onclick="calcInput('2')">2</button>
                <button class="calc-btn" onclick="calcInput('3')">3</button>
                <button class="calc-btn" onclick="calcInput('+')">+</button>
                <button class="calc-btn" onclick="calcInput('0')">0</button>
                <button class="calc-btn" onclick="calcInput('.')">.</button>
                <button class="calc-btn" style="grid-column: span 2; background:var(--accent-primary);" onclick="calcInput('=')">=</button>
            </div>
        </div>
    `;
}

let calcEquation = '';
window.calcInput = (val) => {
    const display = document.getElementById('calc-display');
    if (val === 'C') {
        calcEquation = '';
        display.innerText = '0';
    } else if (val === '=') {
        try {
            calcEquation = eval(calcEquation).toString();
            display.innerText = calcEquation;
        } catch {
            display.innerText = 'Error';
            calcEquation = '';
        }
    } else {
        calcEquation += val;
        display.innerText = calcEquation;
    }
};
