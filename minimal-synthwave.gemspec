# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "minimal-synthwave"
  spec.version       = "0.0.1"
  spec.authors       = ["Withney Guilherme"]
  spec.email         = ["withney.gomes@gmail.com"]

  spec.summary       = "A (nearly) no-CSS, fast, minimalist Jekyll theme with synthwave aesthetics."
  spec.homepage      = "https://github.com/wguilherme/minimal-synthwave"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.9.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.15.1"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.7.1"

end
