module Jekyll
  module AssetFilter
    def hardSpace(txt)
      if txt
        return txt.gsub(/\s+/, "\u00A0")
      end
      nil
    end

     def delAllSpace(txt)
      txt.gsub(/\s+/, "")
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
