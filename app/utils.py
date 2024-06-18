def removeSpecialChars(job):
    job["title"]=job["title"].replace("'"," ")
    job["description"] = job["description"].translate(str.maketrans({"'": " ", "\n": "<br>", '"': ""}))
    job["qualifications"] = job["qualifications"].translate(str.maketrans({"'": " ", "\n": "<br>", "\\": "", '{': " ", '}': " ", '"': " "}))
    return job
