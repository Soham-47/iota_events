# Create images directory if it doesn't exist
$imageDir = "public/images"
if (-not (Test-Path -Path $imageDir)) {
    New-Item -ItemType Directory -Path $imageDir -Force
}

# List of image URLs and their corresponding filenames
$images = @{
    "astronaut.jpg" = "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXN0cm9uYXV0fGVufDB8fDB8fHww"
    "hackathon.png" = "https://www.brightidea.com/wp-content/uploads/Who_Participates_in_a_Hackathon.png"
    "space1.jpg" = "https://s.yimg.com/ny/api/res/1.2/dckglYIR.w0Or.LvhA0xkA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02NTI-/https://media.zenfs.com/en/futurism_981/a22c8495ef360550ca0bbcabeb4a257a"
    "space2.jpg" = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOelHPDSiKj6nKnz26NdLVRxnSaMWsJxDkZQ&s"
    "mars-rover.jpg" = "https://www.jenoptik.com/-/media/websiteimages/visuals/photonics/mars-rover/mars-cosmos-space.jpg?impolicy=resize&width=1920"
    "space3.jpg" = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYPu8BRJMYcpxmFUf2eQInla2XdFzG6fEy6qdIOcGc77rkGInDcAA41n63kKGlMx8EoXo&usqp=CAU"
    "dark-matter.jpg" = "https://discovery.sndimg.com/content/dam/images/discovery/fullset/2022/10/Dark%20Matter%20GettyImages-899006948.jpg.rend.hgtvcom.1280.1280.suffix/1666986573040.jpeg"
}

# Download each image
foreach ($image in $images.GetEnumerator()) {
    $outputPath = Join-Path -Path $imageDir -ChildPath $image.Key
    if (-not (Test-Path -Path $outputPath)) {
        Write-Host "Downloading $($image.Key)..."
        try {
            Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
            Write-Host "Downloaded $($image.Key) successfully"
        }
        catch {
            Write-Host "Failed to download $($image.Key): $_"
        }
    }
    else {
        Write-Host "$($image.Key) already exists, skipping..."
    }
}

Write-Host "All images have been processed!"
