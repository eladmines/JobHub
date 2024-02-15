class companyScrapingDetails:
     def __init__(self,nameScrapingElement,tagScrapingElement,attribute):
        # First three is for scraping jobs links from the main jobs page.
        #  Name of the element identifier
        self.nameScrapingElement=nameScrapingElement
        #  Name of the element tag ,for example :"By.CLASS_NAME"
        self.tagScrapingElement=tagScrapingElement
        # The information we want to scrape
        self.attribute=attribute

