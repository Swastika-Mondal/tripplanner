from .bing import Bing


def get_cdn_links(query, limit=100, adult_filter_off=True, timeout=60, filter="", verbose=True):
    if adult_filter_off:
        adult = 'off'
    else:
        adult = 'on'

    print(f"[%] Fetching CDN Links for '{query}'")
    bing = Bing(query, limit, adult, timeout, filter, verbose)
    links = bing.fetch_links()
    print(f"\n[%] Found {len(links)} links.")
    return links


if __name__ == '__main__':
    query = 'dog'
    links = get_cdn_links(query, limit=10, timeout=1)
    for idx, link in enumerate(links, start=1):
        print(f"{idx}: {link}")
