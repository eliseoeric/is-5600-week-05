let offset = 0;
let limit = 12;
let tag = '';

const out = document.getElementById('out');
const statusEl = document.getElementById('status');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const applyBtn = document.getElementById('apply');
const tagInput = document.getElementById('tag');
const limitSelect = document.getElementById('limit');

applyBtn.addEventListener('click', () => {
  tag = tagInput.value.trim();
  limit = Number(limitSelect.value);
  offset = 0;
  load();
});

prevBtn.addEventListener('click', () => {
  if (offset <= 0) return;
  offset = Math.max(0, offset - limit);
  load();
});

nextBtn.addEventListener('click', () => {
  offset = offset + limit;
  load();
});

async function load() {
  statusEl.textContent = 'Loading...';
  try {
    const qs = new URLSearchParams({
      offset: String(offset),
      limit: String(limit),
      ...(tag ? { tag } : {})
    }).toString();

    const res = await fetch(`/products?${qs}`);
    if (!res.ok) {
      const err = await safeJson(res);
      throw new Error(err?.error || `HTTP ${res.status}`);
    }
    const items = await res.json();

    // If fewer than limit are returned, likely end of list—disable Next
    prevBtn.disabled = offset <= 0;
    nextBtn.disabled = items.length < limit;

    render(items);
    statusEl.textContent = `offset=${offset}, limit=${limit}${tag ? `, tag=${tag}` : ''} — returned ${items.length}`;
  } catch (e) {
    console.error(e);
    out.innerHTML = `<div class="card" style="padding:12px;color:#b91c1c;border-color:#fecaca;background:#fef2f2">
      <strong>Error:</strong> ${e.message}
    </div>`;
    statusEl.textContent = 'Error';
  }
}

function render(items) {
  out.innerHTML = items.map(p => {
    const title = Array.isArray(p.tags) ? p.tags.slice(0,3).map(t => t.title || t).join(', ') : (p.title || p.name || 'Untitled');
    const artist = p.user ? `${p.user.first_name || ''} ${p.user.last_name || ''}`.trim() : '';
    const img = p?.urls?.thumb || p?.urls?.small || '';
    const link = p?.links?.html || '#';

    return `
      <div class="card">
        ${img ? `<img class="thumb" src="${img}" alt="${p.alt_description || title}">` : ''}
        <div class="meta">
          <div><strong>${title}</strong></div>
          ${artist ? `<div class="muted">${artist}</div>` : ''}
          <div class="muted">${p._id || p.id || ''}</div>
          ${link && link !== '#' ? `<div style="margin-top:6px"><a href="${link}" target="_blank">View</a></div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}

// initial load
load();
