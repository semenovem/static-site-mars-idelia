module Jekyll
  module AssetFilter
    def isTrue(content, condition)
      condition ? content : ""
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
