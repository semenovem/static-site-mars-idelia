module Jekyll
  module MapStringsByRegexp
    def map_strings_by_regexp(list, regexp, replace)
      reg = Regexp.new regexp

      list.map { |item| item.gsub(reg, replace) }
    end
  end
end

Liquid::Template.register_filter(Jekyll::MapStringsByRegexp)
