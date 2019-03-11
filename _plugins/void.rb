module Jekyll
  module AssetFilter
    def void(t)
      nil
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
