export let flipkartLocators = {

    searchBox: "//button[@type='submit']//following-sibling::div/input",
    search: "//button[@type='submit']",
    countLabels: "//div[@id='container']/div/div[3]/div/div[2]/div/div/div/div/a/div[2]/div[1]/div[1]",
    nextButton: "//span[text()='Next']",

    getLabels(x: number) {

        return `//div[@id='container']/div/div[3]/div/div[2]/div[${x}]/div/div/div/a/div[2]/div[1]/div[1]`;

    },
    crossButton: "//span[text()='✕']",
    getPrice(x: number) {
        return `//div[@id='container']/div/div[3]/div/div[2]/div[${x}]/div/div/div/a/div[2]/div[2]/div[1]/div/div[1]`;
    }

}