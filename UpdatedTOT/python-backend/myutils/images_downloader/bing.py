from pathlib import Path
import urllib.request
import urllib
import re

'''
Python API to fetch image links from Bing.
Author: Guru Prasad (g.gaurav541@gmail.com)
Updated for CDN links only: Sk Ahidulla
'''


class Bing:
    def __init__(self, query, limit, adult, timeout, filter='', verbose=True):
        self.query = query
        self.adult = adult
        self.filter = filter
        self.verbose = verbose
        self.seen = set()

        assert type(limit) == int, "limit must be integer"
        self.limit = limit
        assert type(timeout) == int, "timeout must be integer"
        self.timeout = timeout

        self.page_counter = 0
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) '
                          'AppleWebKit/537.11 (KHTML, like Gecko) '
                          'Chrome/23.0.1271.64 Safari/537.11',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
            'Accept-Encoding': 'none',
            'Accept-Language': 'en-US,en;q=0.8',
            'Connection': 'keep-alive'
        }

    def get_filter(self, shorthand):
        if shorthand == "line" or shorthand == "linedrawing":
            return "+filterui:photo-linedrawing"
        elif shorthand == "photo":
            return "+filterui:photo-photo"
        elif shorthand == "clipart":
            return "+filterui:photo-clipart"
        elif shorthand == "gif" or shorthand == "animatedgif":
            return "+filterui:photo-animatedgif"
        elif shorthand == "transparent":
            return "+filterui:photo-transparent"
        else:
            return ""

    def fetch_links(self):
        links = []
        while len(links) < self.limit:
            if self.verbose:
                print(f'\n[!!] Indexing page: {self.page_counter + 1}')

            request_url = (
                f'https://www.bing.com/images/async?q={urllib.parse.quote_plus(self.query)}'
                f'&first={self.page_counter * self.limit}&count={self.limit}'
                f'&adlt={self.adult}&qft={"" if self.filter is None else self.get_filter(self.filter)}'
            )

            request = urllib.request.Request(request_url, None, headers=self.headers)
            response = urllib.request.urlopen(request)
            html = response.read().decode('utf8')

            if not html:
                print("[%] No more images are available")
                break

            page_links = re.findall(r'murl&quot;:&quot;(.*?)&quot;', html)
            page_links = [link for link in page_links if link not in self.seen]
            self.seen.update(page_links)

            links.extend(page_links[:self.limit - len(links)])
            if self.verbose:
                print(f"[{len(page_links)}] Images indexed on Page {self.page_counter + 1}")

            self.page_counter += 1

        return links
