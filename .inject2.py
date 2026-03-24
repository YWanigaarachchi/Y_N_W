import glob, re

html_files = glob.glob('d:/1_Yasas/10_my website YNW/Y_N_W/*.html')

gzc_inline = '<a href="https://www.gzc.lk" target="_blank" class="btn-gzc-nav">GZC Company <i class="fa-solid fa-arrow-up-right-from-square"></i></a>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove GZC button from inside nav-links (wherever it currently sits)
    content = re.sub(r'\s*<a [^>]*class="btn-gzc-nav"[^>]*>.*?</a>', '', content, flags=re.DOTALL)

    # Now insert the GZC button AFTER the closing </div> of nav-links, before </div> of nav-container
    # Pattern: </div>\n        </div>\n    </nav>
    content = content.replace(
        '            </div>\n        </div>\n    </nav>',
        '            </div>\n            ' + gzc_inline + '\n        </div>\n    </nav>'
    )

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done")
