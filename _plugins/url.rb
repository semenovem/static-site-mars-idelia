module Jekyll
  class Url < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
      @markup = markup.strip
    end

    def render(context)
      page = context.registers[:page]

      if @markup.empty?
        return "Error processing input, expected syntax: {% url name variable value %}"
      end

      props = @markup

      up = def_len_path(page['url'])

      ((up == 0 ? './' : '../' * up) + props).gsub(/\/{2,}/, "/")
    end


    private

    def def_len_path(path)
      path.scan(/\//).size - 1
    end
  end
end

Liquid::Template.register_tag('url', Jekyll::Url)




module Jekyll
  module AssetFilter
    def makeUrl(r)
      resource = trim(r)

      unless resource[0] == "/"
        return format("./" + resource)
      end

      page = @context.registers[:page]
      if page['url'].include? "404"
        return format("/" + resource)
      end

      up = def_len_path(page['url'])

      format((up == 0 ? './' : '../' * up) + resource)
    end


    private

    def def_len_path(path)
      path.scan(/\//).size - 1
    end

    def trim(s)
      s.gsub(/^\s+/, '').gsub(/\s+$/, '')
    end

    def format(s)
      s.gsub(/\/{2,}/, "/")
    end
  end
end

Liquid::Template.register_filter(Jekyll::AssetFilter)
