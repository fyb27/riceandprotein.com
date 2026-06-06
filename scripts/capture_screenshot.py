from playwright.sync_api import sync_playwright

def capture(url, output_path, viewport_width=1920, viewport_height=1080):
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--ignore-certificate-errors"])
        context = browser.new_context(
            viewport={'width': viewport_width, 'height': viewport_height},
            ignore_https_errors=True
        )
        page = context.new_page()
        page.goto(url, wait_until='domcontentloaded', timeout=30000)
        # Give the page a moment to settle
        page.wait_for_timeout(2000)
        page.screenshot(path=output_path, full_page=False)
        browser.close()

if __name__ == "__main__":
    # Desktop screenshot
    capture(
        url="https://riceandprotein.com",
        output_path="Z:/sites/riceandprotein/screenshots/desktop_1920x1080.png",
        viewport_width=1920,
        viewport_height=1080
    )
    print("Desktop screenshot saved.")

    # Mobile screenshot
    capture(
        url="https://riceandprotein.com",
        output_path="Z:/sites/riceandprotein/screenshots/mobile_375x812.png",
        viewport_width=375,
        viewport_height=812
    )
    print("Mobile screenshot saved.")
